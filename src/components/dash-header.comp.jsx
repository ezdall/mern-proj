import { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRightFromBracket,
  faFilePen,
  faFileCirclePlus,
  faUserGear,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';

import useAuth from '../hooks/useAuth';
import { useSendLogoutMutation } from '../features/authApiSlice';

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

export default function DashHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isManager, isAdmin } = useAuth();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess, navigate]);

  // const onLogoutClick = () => sendLogout();

  const onNewNoteClick = () => navigate('/dash/notes/new');
  const onNewUserClick = () => navigate('./users/new');
  const onNotesClick = () => navigate('./notes');
  const onUsersClick = () => navigate('./users');

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

  let buttonContent;
  if (isLoading) {
    // buttonContent = <PulseLoader color='#FFF' />;
    <p>Loading...</p>;
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

  // if (isLoading) return <p>Logging Out...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;

  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <header className="dash-header">
        <div className={`dash-header__container ${dashClass}`}>
          <Link to="/dash">
            <h1 className="dash-header__title">techNotes</h1>
          </Link>
          <nav className="dash-header__nav">
            {buttonContent}

            {/* <button
            type="submit"
            className="icon-button"
            title="logout"
            onClick={onLogoutClick}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button> */}
          </nav>
        </div>
      </header>
    </>
  );
}
