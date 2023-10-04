import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

export default function DashFooter() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
      <p>Current User:</p>
      <p>Status:</p>
    </footer>
  );
}
