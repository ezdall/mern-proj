import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { store } from '../api/store';
import { notesApiSlice } from './notes/notesApiSlice';
import { usersApiSlice } from './users/usersApiSlice';

export default function Prefetch() {
  useEffect(() => {
    console.log('subscribing');

    // fill-up users when in /notes route
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      console.log('unsub');
      notes.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
}
