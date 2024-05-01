import { Routes, Route } from 'react-router-dom';
import ParticlesBg from 'particles-bg';

// comp
import Layout from './components/layout.comp';
import DashLayout from './components/dash-layout.comp';
import Public from './components/public.comp';
// auth
import Login from './features/login.comp';
import Welcome from './features/welcome.comp';
import Prefetch from './features/prefetch.comp';
import PersistLogin from './features/persist-login.comp';
import RequireAuth from './features/require-auth.comp';
// users
import UsersList from './features/users/users-list.comp';
import NewUserForm from './features/users/new-user-form.comp';
import EditUser from './features/users/edit-user.comp';
// notes
import NoteList from './features/notes/notes-list.comp';
import NewNote from './features/notes/new-note.comp';
import EditNote from './features/notes/edit-note.comp';

import useTitle from './hooks/useTitle';
import { ROLES } from './config/roles';

export default function App() {
  const { Manager, Admin, Employee } = ROLES;

  useTitle('TechFix Solutions');

  return (
    <>
      <ParticlesBg color="#9bb4f7" type="cobweb" bg />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />

          {/* Protecte Routes */}
          <Route element={<PersistLogin />}>
            <Route
              element={
                <RequireAuth allowedRoles={[Manager, Admin, Employee]} />
              }
            >
              <Route element={<Prefetch />}>
                <Route path="dash" element={<DashLayout />}>
                  <Route index element={<Welcome />} />
                  {/* /dash/notes/:noteId  */}
                  <Route path="notes">
                    <Route index element={<NoteList />} />
                    <Route path="new" element={<NewNote />} />
                    <Route path=":id" element={<EditNote />} />
                  </Route>
                  {/* /dash/users/:userId  */}
                  <Route
                    element={<RequireAuth allowedRoles={[Manager, Admin]} />}
                  >
                    <Route path="users">
                      <Route index element={<UsersList />} />
                      <Route path="new" element={<NewUserForm />} />
                      <Route path=":id" element={<EditUser />} />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
          {/* Protedct-Route End */}
        </Route>
      </Routes>
    </>
  );
}
