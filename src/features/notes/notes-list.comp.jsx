import { useGetNotesQuery } from './notesApiSlice';

import Note from './note.comp';
import useAuth from '../../hooks/useAuth';

export default function NoteList() {
  // get All Notes
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetNotesQuery('notesList', {
    pollingInterval: 30 * 1000, // re-fetch data after 15s
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  const { username, isManager, isAdmin } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  if (isError)
    return (
      <p className="errmsg">
        {error?.data?.error}
        {error?.data?.message}
      </p>
    );

  if (isSuccess) {
    const { ids, entities } = notes;

    let filteredIds = [];

    // return all
    if (isManager || isAdmin) {
      filteredIds = [...ids];
    } else {
      // return only
      filteredIds = ids.filter(
        noteId => entities[noteId].user.username === username
      );
    }

    const tableContent =
      ids?.length &&
      filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />);

    console.log(tableContent);

    return (
      <>
        <h1>Notes List</h1>
        <table className="table table--notes">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th note__status">
                Username
              </th>
              <th scope="col" className="table__th note__created">
                Created
              </th>
              <th scope="col" className="table__th note__updated">
                Updated
              </th>
              <th scope="col" className="table__th note__title">
                Title
              </th>
              <th scope="col" className="table__th note__username">
                Owner
              </th>
              <th scope="col" className="table__th note__edit">
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
