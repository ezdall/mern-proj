import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import HashLoader from 'react-spinners/HashLoader';

export default function Welcome() {
  const { username, isAdmin, isManager } = useAuth();

  const date = new Date();
  const today = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full'
  }).format(date);

  return (
    <section className="welcome">
      <p>{today}</p>
      <h1>Welcome! {username} </h1>
      <HashLoader color="#fff" />
      <p>
        <Link to="/dash/notes">[ View ] - Note List</Link>
      </p>
      <p>
        <Link to="/dash/notes/new">[ Add ] - New Note</Link>
      </p>
      {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/users">[ View ] - User Settings</Link>
        </p>
      )}
      {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/users/new">[ Add ] - New User</Link>
        </p>
      )}
    </section>
  );
}
