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

          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 700);
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
          console.log('refresh fulfill:', data);

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
