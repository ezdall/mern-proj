import { apiSlice } from '../api/apiSlice';
import { logOut, setCredentials } from './authSlice';

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
          method: 'GET'
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('logOut fulfill:', data);

          // to fix bug in logout
          // clear both, coz they are separate api
          setTimeout(() => {
            dispatch(logOut()); // clear token
            dispatch(apiSlice.util.resetApiState()); // clear all
          }, 750); // at least 100ms (base on my test)
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
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('refresh fulfill:');
          console.log(data);

          const { accessToken } = data;

          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      }
    })
  })
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
  authApiSlice;
