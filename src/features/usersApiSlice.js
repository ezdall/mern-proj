import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

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
        const loadUsers = responseData.map(user => {
          return { ...user, id: user._id };
        });
        return usersAdapter.setAll(initialState, loadUsers);
      },

      providesTags(result, error, arg) {
        if (result?.ids) {
          return [
            { type: 'User', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'User', id }))
          ];
        }
        return [{ type: 'User', id: 'LIST' }];
      },
      keepUnusedDataFor: 5 // 5sec, default is 60s
    })
  })
});

export const { useGetUsersQuery } = usersApiSlice;

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
