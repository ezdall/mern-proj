import { useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { useSendLogoutMutation } from '../features/authApiSlice';

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

export default function DashHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [
    sendLogout,
    { isLoading, isSuccess, isError, error }
  ] = useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess, navigate]);

  const onLogoutClick = () => sendLogout();

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = 'dash-header__container--small';
  }

  if (isLoading) return <p>Logging Out...</p>;

  if (isError) return <p>Error: {error.data?.error}</p>;

  return (
    <header className="dash-header">
      <div className={`dash-header__container ${dashClass}`}>
        <Link to="/dash">
          <h1 className="dash-header__title">techNotes</h1>
        </Link>
        <nav className="dash-header__nav">
          <button
            type="submit"
            className="icon-button"
            title="logout"
            onClick={onLogoutClick}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        </nav>
      </div>
    </header>
  );
}
