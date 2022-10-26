import React from 'react';
import { Routes, Route } from 'react-router-dom';


// comp
import Layout from './components/layout.comp';
import DashLayout from './components/dash-layout.comp';
import Public from './components/public.comp';
//
import Login from './features/login.comp';
import Welcome from './features/welcome.comp';
import NoteList from './features/notes-list.comp';
import UsersList from './features/users-list.comp';
//
import NewUserForm from './features/new-user-form.comp';
import NewNote from './features/new-note.comp';
import EditUser from './features/edit-user.comp';
import EditNote from './features/edit-note.comp';


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
            <Route path=":id" element={<EditNote />} />
            <Route path="new" element={<NewNote />} />
          </Route>
          {/* /dash/users/:userId  */}
          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path=":id" element={<EditUser />} />
            <Route path="new" element={<NewUserForm />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
