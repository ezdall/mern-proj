import { useParams } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';

import EditNoteForm from './edit-note-form.comp';
import useAuth from '../../hooks/useAuth';
import { useGetNotesQuery } from './notesApiSlice';
import { useGetUsersQuery } from '../users/usersApiSlice';

export default function EditNote() {
  const { id } = useParams();

  const { username, isAdmin, isManager } = useAuth();

  const { note } = useGetNotesQuery('notesList', {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id]
    })
  });

  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map(id => data?.entities[id])
    })
  });

  // && ?
  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return <p className="errmsg">No Access</p>;
    }
  }

  if (note && users?.length) return <EditNoteForm note={note} users={users} />;

  return <HashLoader color="#fff" />;
}
