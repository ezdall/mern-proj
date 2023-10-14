// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectUserById } from './usersApiSlice';
import EditUserForm from './edit-user-form.comp';

export default function EditUser() {
  // const navigate = useNavigate();
  const { id } = useParams();

  const user = useSelector(state => selectUserById(state, id));

  if (user) {
    return <EditUserForm user={user} />;
  }
  return <p>/users/:id. Loading... No User yet...</p>;
}
