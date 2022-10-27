import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../api/apiSlice';

const usersAdapter = createEntityAdapter({});
const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query() {
        return '/users';
      },
      validateStatus(response, result) {
        return response.status === 200 && !result.isError;
      },
      transformResponse(responseData) {
        const loadedUsers = responseData.map(user => {
          return { ...user, id: user._id };
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags(result, error, arg) {
        if (result?.ids) {
          return [
            { type: 'User', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'User', id }))
          ];
        }
        return [{ type: 'User', id: 'LIST' }];
      }
    }),
    // crud add
    addNewUser: builder.mutation({
      query(initialUserData) {
        return {
          url: '/users',
          method: 'POST',
          body: {
            ...initialUserData
          }
        };
      },
      invalidatesTags: [{ type: 'User', id: 'LIST' }]
    }),
    // update
    updateUser: builder.mutation({
      query(initialUserData) {
        return {
          url: `/users/${initialUserData.id}`,
          method: 'PATCH',
          body: { ...initialUserData }
        };
      },
      invalidatesTags(result, error, arg) {
        return [{ type: 'User', id: arg.id }];
      }
    }),
    // delete
    deleteUser: builder.mutation({
      query({ id }) {
        return {
          url: `/users/${id}`,
          method: 'DELETE',
          body: { id }
        };
      },
      invalidatesTags(result, error, arg) {
        return [{ type: 'User', id: arg.id }];
      }
    })
  })
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = usersApiSlice;

// returns the query results object
export const selectUserResult = usersApiSlice.endpoints.getUsers.select();

// create memoized selector
const selectUsersData = createSelector(
  selectUserResult,
  usersResult => usersResult.data // normalized state object with ids & entities
);

// getselectors create these selectors and we rename them w/ aliases
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState);
