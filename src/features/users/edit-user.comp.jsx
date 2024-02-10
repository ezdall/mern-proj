import { useParams } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';

import EditUserForm from './edit-user-form.comp';
import { useGetUsersQuery } from './usersApiSlice';

export default function EditUser() {
  const { id } = useParams();

  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id]
    })
  });

  if (user) {
    return <EditUserForm user={user} />;
  }
  return <HashLoader color="#fff" />;
}
