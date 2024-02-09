// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import HashLoader from 'react-spinners/HashLoader';

import EditUserForm from './edit-user-form.comp';
// import { selectUserById } from './usersApiSlice';
import { useGetUsersQuery } from './usersApiSlice';

export default function EditUser() {
  // const navigate = useNavigate();
  const { id } = useParams();

  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id]
    })
  });

  // const user = useSelector(state => selectUserById(state, id));

  if (user) {
    return <EditUserForm user={user} />;
  }
  return <p>/users/:id. Loading... No User yet...</p>;
}
