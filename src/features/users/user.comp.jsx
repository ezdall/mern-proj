// import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

// import { selectUserById } from './usersApiSlice';
import { useGetUsersQuery } from './usersApiSlice';

function User({ userId }) {
  const navigate = useNavigate();

  // use userId to find user
  // const user = useSelector(state => selectUserById(state, userId));
  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId]
    })
  });

  if (user) {
    const handleEditClick = () => navigate(`/dash/users/${userId}`);

    // array to string w/ reformat
    const userRolesString = user.roles.toString().replaceAll(',', ', ');

    const cellStatus = user.active ? '' : 'table__cell--inactive';

    return (
      <tr className="table__row user">
        <td className={`table__cell ${cellStatus}`}>{user.username}</td>
        <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
        <td className={`table__cell ${cellStatus}`}>
          <button
            type="button"
            className="icon-button table__button"
            onClick={handleEditClick}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  }

  // return null; // the parent-comp is a <table />
  return (
    <tr className="table__row user">
      <td className="table__cell"> no user </td>
    </tr>
  );
}

// const MemoUser = memo(User);

export default User;
