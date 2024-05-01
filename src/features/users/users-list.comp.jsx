import { useGetUsersQuery } from './usersApiSlice';
import HashLoader from 'react-spinners/HashLoader';

import MemoUser from './user.comp';

export default function UsersList() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery('usersList', {
    pollingInterval: 60 * 1000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  if (isLoading) return <HashLoader color="#fff" />;

  if (isError)
    return <p className="errmsg">{error.data?.error || error.data?.message}</p>;

  if (isSuccess) {
    const { ids } = users;

    const tableContent =
      ids?.length &&
      ids.map(userId => <MemoUser key={userId} userId={userId} />);

    return (
      <>
        <h1>Users Settings</h1>
        <table className="table table--users">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th user__username">
                Username
              </th>
              <th scope="col" className="table__th user__roles">
                Roles
              </th>
              <th scope="col" className="table__th user__edit">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </>
    );
  }
}
