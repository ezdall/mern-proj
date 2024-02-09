import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { store } from '../api/store';
import { notesApiSlice } from './notes/notesApiSlice';
import { usersApiSlice } from './users/usersApiSlice';

export default function Prefetch() {
  useEffect(() => {
    console.log('prefetch');

    store.dispatch(
      notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true })
    );

    store.dispatch(
      usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true })
    );
  }, []);

  return <Outlet />;
}
