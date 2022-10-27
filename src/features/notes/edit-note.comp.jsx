import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectAllUsers } from '../users/usersApiSlice';
import { selectNoteById } from './notesApiSlice';

import EditNoteForm from './edit-note-form.comp';

export default function EditNote() {
  const { id } = useParams();

  const note = useSelector(state => selectNoteById(state, id));
  const users = useSelector(selectAllUsers);

  if (note && users?.length) return <EditNoteForm note={note} users={users} />;

  return <p> /notes/:id. Loading...</p>;
}
