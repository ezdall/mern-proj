import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectUserById, selectAllUsers } from './usersApiSlice';
import EditUserForm from './edit-user-form.comp';

export default function EditUser() {
  const { id } = useParams();

  const users = useSelector(selectAllUsers);
  const user = useSelector(state => selectUserById(state, id));

  console.log('users', users);

  if (user) {
    return <EditUserForm user={user} />;
  }

  return <p>Loading...</p>;
}
