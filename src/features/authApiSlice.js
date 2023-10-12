import { apiSlice } from '../api/apiSlice';
import { logOut } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query(credentials) {
        return {
          url: '/auth',
          method: 'POST',
          body: { ...credentials }
        };
      }
    }),
    sendLogout: builder.mutation({
      query() {
        return {
          url: '/auth/logout',
          method: 'POST'
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(logOut());
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      }
    }),
    refresh: builder.mutation({
      query() {
        return {
          url: '/auth/refresh',
          method: 'GET'
        };
      }
    })
  })
});

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation
} = authApiSlice;
