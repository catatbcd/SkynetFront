/* eslint-disable import/named */
/* eslint-disable no-restricted-imports */
import React from 'react';
import { useUser } from '../context/userContext';

const PrivateRoute = ({ roleList, children }) => {
  const { userData } = useUser();

  if (roleList.includes(userData.rol)) {
    return children;
  }

  return (
    <div className='text-9xl text-red-500 '>
      No estás autorizado para ver este sitio.
    </div>
  );
};

export default PrivateRoute;
