// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectUserById } from './usersApiSlice';
import EditUserForm from './edit-user-form.comp';

export default function EditUser() {
  // const navigate = useNavigate();
  const { id } = useParams();

  const user = useSelector(state => selectUserById(state, id));

  // check if user exist, else return to /users
  // useEffect(() => {
  //   if (!user) {
  //     navigate('/dash/users');
  //   }
  // }, [navigate, user]);

  if (user) {
    return <EditUserForm user={user} />;
  }
  return <p>/users/:id. Loading...</p>;
}
