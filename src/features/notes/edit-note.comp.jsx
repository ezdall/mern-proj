import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectAllUsers, selectUserById } from '../users/usersApiSlice'
import { selectNoteById } from './notesApiSlice'

import EditNoteForm from './edit-note-form.comp'

export default function EditNote() {
  const { id } = useParams()

  const note = useSelector(state => selectNoteById(state, id))
  // const users = useSelector(state => selectUserById(state, '6358b631d677930e48fe6441'))


// console.log('users', users)

  const content = note 
    ? <EditNoteForm note={note} /> 
    : <p>Loading...</p>

  return content;
}
