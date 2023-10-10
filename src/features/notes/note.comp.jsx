import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import { selectNoteById } from './notesApiSlice';

export default function Note({ noteId }) {
  // use noteId to find note

  const note = useSelector(state => selectNoteById(state, noteId));

  const navigate = useNavigate();

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
        <td className="table__cell note__username">{note.user.username}</td>
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

  return <p>/notes. Loading...</p>;
}
