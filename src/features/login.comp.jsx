import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';

import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';

import usePersist from '../hooks/usePersist';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [persist, setPersist] = usePersist();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const onUserInput = e => setUsername(e.target.value);
  const onPassInput = e => setPassword(e.target.value);
  const handleToggle = () => setPersist(prev => !prev);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));

      // reset, redirect
      setUsername('');
      setPassword('');
      navigate('/dash');
    } catch (err) {
      if (!err.status) {
        setErrMsg('no server response');
      }
      if (err.status === 400) {
        setErrMsg('Missing username or password');
      }
      if (err.status === 401) {
        setErrMsg('Unauthorized');
      }

      setErrMsg(err?.data?.error || err?.data?.message || err?.error);
      errRef.current?.focus();
    }
  };

  const errClass = errMsg ? 'errmsg' : 'offscreen';

  if (isLoading) return <HashLoader color="#fff" />;

  return (
    <section>
      <header>
        <h1>Login</h1>
      </header>
      <main className="login">
        <p ref={errRef} className={errClass}>
          {errMsg}
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            className="form__input"
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            ref={userRef}
            value={username}
            onChange={onUserInput}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            className="form__input"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={onPassInput}
            required
          />
          <button type="submit" className="form__submit-button">
            Sign In
          </button>
          <label htmlFor="persist" className="form__persist">
            <input
              type="checkbox"
              name="persist"
              id="persist"
              className="form__checkbox"
              checked={persist}
              onChange={handleToggle}
            />
            Remember Login
          </label>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );
}
