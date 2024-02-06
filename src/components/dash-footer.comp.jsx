import { useLocation, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../hooks/useAuth';

export default function DashFooter() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { username, status } = useAuth();

  const onGoHomeClick = () => navigate('/dash');

  return (
    <footer className="dash-footer">
      {pathname !== '/dash' && (
        <button
          type="button"
          className="dash-footer__button icon-button"
          title="Home"
          onClick={onGoHomeClick}
        >
          <FontAwesomeIcon icon={faHouse} />
        </button>
      )}
      <p>User: {username}</p>
      <p>Status: {status}</p>
    </footer>
  );
}
