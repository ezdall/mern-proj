import HashLoader from 'react-spinners/HashLoader';

import NewNoteForm from './new-note-form.comp';
import { useGetUsersQuery } from '../users/usersApiSlice';

export default function NewNote() {
  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map(id => data?.entities[id])
    })
  });

  if (users?.length) return <NewNoteForm users={users} />;

  return <HashLoader color="#fff" />;
}
