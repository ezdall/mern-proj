import { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HashLoader from 'react-spinners/HashLoader';
import {
  faRightFromBracket,
  faFilePen,
  faFileCirclePlus,
  faUserGear,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';

import useAuth from '../hooks/useAuth';
import { useSendLogoutMutation } from '../features/authApiSlice';

const DASH_REGEX = /^\/dash(\/)?$/; // '/dash'
const NOTES_REGEX = /^\/dash\/notes(\/)?$/; // '/dash/notes'
const USERS_REGEX = /^\/dash\/users(\/)?$/; // '/dash/users'

export default function DashHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isManager, isAdmin } = useAuth();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    // logout success
    if (isSuccess) navigate('/');
  }, [isSuccess, navigate]);

  const onNewNoteClick = () => navigate('/dash/notes/new');
  const onNewUserClick = () => navigate('./users/new');
  const onNotesClick = () => navigate('./notes');
  const onUsersClick = () => navigate('./users');

  // const onLogoutClick = () => sendLogout();

  // console.log({ pathname });

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = 'dash-header__container--small';
  }

  let newNoteButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button
        type="button"
        className="icon-button"
        title="New Note"
        onClick={onNewNoteClick}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }

  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        type="button"
        className="icon-button"
        title="New User"
        onClick={onNewUserClick}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    );
  }

  let userButton = null;
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
      userButton = (
        <button
          type="button"
          className="icon-button"
          title="Users"
          onClick={onUsersClick}
        >
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      );
    }
  }

  let notesButton = null;
  if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
    notesButton = (
      <button
        type="button"
        className="icon-button"
        title="Notes"
        onClick={onNotesClick}
      >
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    );
  }

  const logoutButton = (
    <button
      type="button"
      className="icon-button"
      title="Logout"
      onClick={sendLogout}
    >
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const errClass = isError ? 'errmsg' : 'offscreen';

  let buttonContent = null;
  if (isLoading) {
    buttonContent = <HashLoader color="#FFF" />;
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {notesButton}
        {newUserButton}
        {userButton}
        {logoutButton}
      </>
    );
  }

  if (isError) return <p>Error: {error.data?.message}</p>;

  return (
    <>
      <p className={errClass}>{error?.data?.message || error?.data?.error}</p>

      <header className="dash-header">
        <div className={`dash-header__container ${dashClass}`}>
          <Link to="/dash">
            <h1 className="dash-header__title">TechFix S.</h1>
          </Link>
          <nav className="dash-header__nav">{buttonContent}</nav>
        </div>
      </header>
    </>
  );
}
