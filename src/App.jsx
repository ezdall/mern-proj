import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashLayout from './components/dash-layout.comp';

// comp
import Layout from './components/layout.comp';
import Login from './features/login.comp';
import Public from './components/public.comp';
//
import Welcome from './features/welcome.comp';
import NoteList from './features/notes-list.comp';
import UsersList from './features/users-list.comp';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />
          {/* /dash/notes/:noteId  */}
          <Route path="notes">
            <Route index element={<NoteList />} />
            <Route path=":noteId" element={<div>:noteId</div>} />
          </Route>
          {/* /dash/users/:userId  */}
          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path=":userId" element={<div>:userId</div>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
