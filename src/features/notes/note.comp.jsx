import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

// import { selectNoteById } from './notesApiSlice';
import { useGetNotesQuery } from './notesApiSlice';

function Note({ noteId }) {
  const navigate = useNavigate();

  // use noteId (not params) to find note
  // const note = useSelector(state => selectNoteById(state, noteId));
  const { note } = useGetNotesQuery('notesList', {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId]
    })
  });

  if (note) {
    // array to string w/ reformat
    // const noteRolesString = note.roles.toString().replaceAll(',', ', ');
    const created = new Date(note.createdAt).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long'
    });

    const updated = new Date(note.updatedAt).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long'
    });

    const handleEditClick = () => navigate(`/dash/notes/${noteId}`);

    return (
      <tr className="table__row">
        <td className="table__cell note__status">
          {note.completed ? (
            <span className="note__status--completed">Completed</span>
          ) : (
            <span className="note__status--open">Open</span>
          )}
        </td>
        <td className="table__cell note__created">{created}</td>
        <td className="table__cell note__updated">{updated}</td>
        <td className="table__cell note__title">{note.title}</td>
        <td className="table__cell note__username">{note.user?.username}</td>
        <td className="table__cell">
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

  //  if no note
  // must be "return null"
  return (
    <tr className="table__row">
      <td className="table__cell note__status"> no note </td>
    </tr>
  );
}

const MemoNote = memo(Note);

export default MemoNote;
