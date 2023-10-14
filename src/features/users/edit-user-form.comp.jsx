import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import { useUpdateUserMutation, useDeleteUserMutation } from './usersApiSlice';
import { ROLES } from '../../config/roles';

const USER_REGEX = /^[A-z]{3,20}$/;
const PASS_REGEX = /^[A-z0-9!@#$%]{6,12}$/;

export default function EditUserForm({ user }) {
  const navigate = useNavigate();

  const [
    updateUser,
    { isLoading, isSuccess, isError, error }
  ] = useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError }
  ] = useDeleteUserMutation();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(user.roles);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PASS_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername('');
      setPassword('');
      setRoles([]);
      navigate('/dash/users');
    }
  }, [isSuccess, isDelSuccess, navigate]);

  // handlers
  const onUsernameChange = ev => setUsername(ev.target.value);
  const onPasswordChange = ev => setPassword(ev.target.value);

  const onRolesChange = ev => {
    const values = Array.from(
      ev.target.selectedOptions, // <select>
      option => option.value
    );
    setRoles(values);
  };

  const onActiveChange = () => setActive(prev => !prev);

  const onSaveUserClick = async ev => {
    ev.preventDefault();

    if (password) {
      await updateUser({
        id: user.id,
        username,
        password,
        roles,
        active
      });
      return;
    }
    // w/o password
    await updateUser({
      id: user.id,
      username,
      roles,
      active
    });
  };

  const onDeleteUserClick = async () => {
    await deleteUser({ id: user.id });
  };

  const options = Object.values(ROLES).map(role => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  let canSave;
  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  }
  canSave = [roles.length, validUsername].every(Boolean) && !isLoading;

  const errClass = isError || isDelError ? 'errmsg' : 'offscreen';
  const validUserClass = !validUsername ? 'form__input--incomplete' : '';
  const validPassClass =
    password && !validPassword ? 'form__input--incomplete' : '';
  const validRolesClass = !roles.length ? 'form__input--incomplete' : '';

  // if <left-side> is null / undefined, return '', else return <left-side>
  const errContent = (error?.data?.error || delError?.data?.error) ?? '';

  if (isLoading) {
    return <p>/users/:id. Loading....</p>;
  }

  return (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={onSaveUserClick}>
        <div className="form__title-row">
          <h2>Edit User</h2>
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
              onClick={onDeleteUserClick}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUsernameChange}
        />
        <label htmlFor="password">
          Password: <span className="nowrap">[empty = no change]</span>{' '}
          <span className="nowrap">[6-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPassClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
        />

        <label
          className="form__label form__checkbox-container"
          htmlFor="user-active"
        >
          ACTIVE:
          <input
            className="form__checkbox"
            id="user-active"
            name="user-active"
            type="checkbox"
            checked={active}
            onChange={onActiveChange}
          />
        </label>

        <label className="form__label" htmlFor="roles">
          ASSIGNED ROLES:
        </label>
        <select
          id="roles"
          name="roles"
          className={`form__select ${validRolesClass}`}
          multiple
          size="3"
          value={roles}
          onChange={onRolesChange}
        >
          {options}
        </select>
      </form>
    </>
  );
}
