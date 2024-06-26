import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

import { selectCurrentToken } from '../features/authSlice';

export default function useAuth() {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = 'Employee';

  if (token) {
    const decode = jwtDecode(token);

    // console.log({ decode });

    const { username, roles } = decode;

    isManager = roles.includes('Manager');
    isAdmin = roles.includes('Admin');

    if (isManager) status = 'Manager';
    if (isAdmin) status = 'Admin';

    return { username, roles, status, isManager, isAdmin };
  }

  return {
    username: '',
    roles: [],
    isManager,
    isAdmin,
    status
  };
}
