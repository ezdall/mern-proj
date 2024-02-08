import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';

import { useRefreshMutation } from './authApiSlice';
import { selectCurrentToken } from './authSlice';
import usePersist from '../hooks/usePersist';

export default function PersistLogin() {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(true);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  // console.log({
  //   isSuccess,
  //   isUninitialized,
  //   isLoading,
  //   isError
  // });

  useEffect(() => {
    // console.log('effecting', token, persist);
    const verifyRefreshToken = async () => {
      try {
        await refresh();

        console.log('refresh persist');

        setTrueSuccess(true);
      } catch (err) {
        console.log(err);
      }
    };
    // React 18 Strict Mode
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      if (!token && persist) verifyRefreshToken();
    }
    return () => {
      effectRan.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content = 'null';

  if (!persist) {
    // persist: no
    // console.log('no persist');
    content = <Outlet />;
  } else if (isLoading) {
    // persist: yes, token: no
    console.log('isLoading');
    content = <p>Loading...</p>;
  } else if (isError) {
    // persist: yes, token: no
    console.log('isError');

    content = (
      <p className="errmsg">
        {`${error?.data?.error || error?.data?.message} - `}
        <Link to="/login">Please login again</Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    // persist: yes, token: yes
    console.log('isSuccess');

    content = <Outlet />;
  } else if (token && isUninitialized) {
    // persist: yes, token: yes
    console.log('token and uninit');
    console.log(isUninitialized);

    content = <Outlet />;
  }

  return content;
}
