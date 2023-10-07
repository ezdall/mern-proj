import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

import { useAddNewUserMutation } from './usersApiSlice';
import { ROLES } from '../config/roles';

export default function NewUserForm() {
  return <div>new</div>;
}
