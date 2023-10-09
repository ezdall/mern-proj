import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

import { useAddNewUserMutation } from './usersApiSlice';
import { ROLES } from '../../config/roles';

const USER_REGEX = /^[A-z]{3,20}$/;
const PASS_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

export default function NewUserForm() {
  const [
    addNewUser,
    { isLoading, isSuccess, isError, error }
  ] = useAddNewUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(['Employee']);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PASS_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername('');
      setPassword('');
      setRoles([]);
      navigate('/dash/users');
    }
  }, [isSuccess, navigate]);

  const onUsernameChange = ev => setUsername(ev.target.value);
  const onPasswordChange = ev => setPassword(ev.target.value);
  const onRolesChange = ev => {
    const values = Array.from(
      ev.target.selectedOptions, // html-collection, <select>
      option => option.value
    );
    setRoles(values);
  };

  // transform each in to Boolean,
  // return false if at-least one is false, return true if all true (pass)
  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveUserClick = async ev => {
    ev.preventDefault();
    if (canSave) {
      await addNewUser({ username, password, roles });
    }
  };

  const options = Object.values(ROLES).map(role => (
    <option key={role} value={role}>
      {role}
    </option>
  ));

  const errClass = isError ? 'errmsg' : 'offscreen';
  const validUserClass = !validUsername ? 'form__input--incomplete' : '';
  const validPassClass = !validPassword ? 'form__input--incomplete' : '';
  const validRolesClass = !roles.length ? 'form__input--incomplete' : '';

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveUserClick}>
        <div className="form__title-row">
          <h2>New User</h2>
          <div className="form__action-buttons">
            <button
              type="submit"
              className="icon-button"
              title="Save"
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
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
          Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPassClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
        />
        <label className="form__label" htmlFor="roles">
          ASSIGNED ROLES:
        </label>
        <select
          name="roles"
          id="roles"
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

  return content;
}
