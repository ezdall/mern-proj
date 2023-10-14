import { useSelector } from 'react-redux';

import { selectAllUsers } from '../users/usersApiSlice';
import NewNoteForm from './new-note-form.comp';

export default function NewNote() {
  const users = useSelector(selectAllUsers);

  if (users?.length) return <NewNoteForm users={users} />;

  return <p> /notes/new. No User...</p>;
}
