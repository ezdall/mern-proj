import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { useUpdateNoteMutation, useDeleteNoteMutation } from './notesApiSlice';

export default function EditNoteForm({ users, note }) {
  const navigate = useNavigate();

  const [
    updateNote,
    { isLoading, isSuccess, isError, error }
  ] = useUpdateNoteMutation();

  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError }
  ] = useDeleteNoteMutation();

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);
  const [userId, setUserId] = useState(note.user._id);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle('');
      setText('');
      navigate('/dash/notes');
    }
  }, [isSuccess, isDelSuccess, navigate]);

  // handlers
  const onTitleChange = ev => setTitle(ev.target.value);
  const onTextChange = ev => setText(ev.target.value);
  const onUserIdChange = ev => setUserId(ev.target.value);
  const onCompletedChange = () => setCompleted(prev => !prev);

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClick = async ev => {
    ev.preventDefault();
    if (canSave) {
      await updateNote({
        id: note.id,
        title,
        text,
        completed,
        user: userId
      });
    }
  };

  const onDeleteNoteClick = async ev => {
    ev.preventDefault();
    await deleteNote({ id: note.id });
  };

  const created = new Date(note.createdAt).toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
  const updated = new Date(note.updatedAt).toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  const options = users.map(user => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  const errClass = isError || isDelError ? 'errmsg' : 'offscreen';
  const validTitleClass = !title ? 'form__input--incomplete' : '';
  const validTextClass = !text ? 'form__input--incomplete' : '';

  // if <left-side> is null / undefined, return '', else return <left-side>
  const errContent = (error?.data?.error || delError?.data?.error) ?? '';

  return (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={onSaveNoteClick}>
        <div className="form__title-row">
          <h2>Edit Note #{note?.ticket}</h2>
          <div className="form__action-buttons">
            <button
              type="submit"
              className="icon-button"
              title="Save"
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              type="button"
              className="icon-button"
              title="Delete"
              onClick={onDeleteNoteClick}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="note-title">
          Title:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="note-title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChange}
        />
        <label className="form__label" htmlFor="note-text">
          Text:
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="note-text"
          name="text"
          value={text}
          onChange={onTextChange}
        />

        <div className="form__row">
          <div className="form__divider">
            <label
              className="form__label form__checkbox-container"
              htmlFor="note-completed"
            >
              Work Completed:
              <input
                className="form__checkbox"
                id="note-completed"
                name="completed"
                type="checkbox"
                checked={completed}
                onChange={onCompletedChange}
              />
            </label>
            <label
              className="form__label form__checkbox-container"
              htmlFor="note-username"
            >
              Assigned to:
            </label>
            <select
              name="username"
              id="note-username"
              className="form__select"
              value={userId}
              onChange={onUserIdChange}
            >
              {options}
            </select>
          </div>
          <div className="form__divider">
            <p className="form__created">
              Created:
              <br />
              {created}
            </p>
            <p className="form__updated">
              Updated:
              <br />
              {updated}
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
