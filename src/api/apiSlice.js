import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { setCredentials } from '../features/authSlice';

const baseQuery = fetchBaseQuery({
  // baseUrl: 'http://localhost:3000/api',
  baseUrl: 'https://techfixs-api.onrender.com/api',
  credentials: 'include', // for cookie
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log(args); // request url, method, body
  // console.log(api); // signal, dispatch, getState()
  // console.log(extraOptions); // custom like {shout: true}

  try {
    let result = await baseQuery(args, api, extraOptions);

    // console.log(result.error.status);

    // If you want, handle other status codes, too
    // by requireLogin, coz verifyJWT errors
    if (result?.error?.status === 401) {
      console.log('sending refresh token');

      // send refresh token to get new access token
      const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

      // console.log({ refreshResult });

      if (refreshResult?.data) {
        // store the new token
        api.dispatch(setCredentials({ ...refreshResult.data }));
        console.log('refresh');

        // retry original query with new access token
        result = await baseQuery(args, api, extraOptions);
      } else {
        if (refreshResult?.error?.status === 403) {
          refreshResult.error.data.message = 'Your login has expired. ';
        }
        return refreshResult;
      }
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const apiSlice = createApi({
  // like axios.
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Note', 'User'],
  endpoints: builder => ({})
});
