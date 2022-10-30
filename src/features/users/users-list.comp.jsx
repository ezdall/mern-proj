import { useGetUsersQuery } from './usersApiSlice';

import User from './user.comp';

export default function UsersList() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60 * 1000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p className="errmsg">{error.data?.error}</p>;

  if (isSuccess) {
    const { ids } = users;

    const tableContent =
      ids?.length && ids.map(userId => <User key={userId} userId={userId} />);

    return (
      <>
        <h1>UsersList</h1>
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
