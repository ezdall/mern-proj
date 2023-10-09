import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersApiSlice'

import NewNoteForm from './new-note-form.comp'

export default function NewNote() {
  const users = useSelector(selectAllUsers)

  // const user = useSelector(state => selectUserById(state, id))

  console.log('users:', users)

  const content = users 
    ? <NewNoteForm users={users} />
    : <p>Loading...</p>

  return content;
}
