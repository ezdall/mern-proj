import { useGetNotesQuery } from './notesApiSlice';

import Note from './note.comp';

export default function NoteList() {
  // get All Notes
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetNotesQuery(undefined, {
    pollingInterval: 15 * 1000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p className="errmsg">{error.data?.error}</p>;

  if (isSuccess) {
    const { ids } = notes;

    const tableContent =
      ids?.length && ids.map(noteId => <Note key={noteId} noteId={noteId} />);

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
