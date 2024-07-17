import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import{ toast} from 'react-toastify';


const Logout = () => {
  const { logoutUser } = useAuth();
  let isMounted = true; // This flag ensures the component is mounted

  useEffect(() => {
    if (isMounted) {
      logoutUser();
      toast.success('Logged out successfully');
    }

    // Cleanup function to set isMounted to false
    return () => {
      isMounted = false;
    };
  }, [logoutUser]);

  return <Navigate to='/login' />;
};

export default Logout;
