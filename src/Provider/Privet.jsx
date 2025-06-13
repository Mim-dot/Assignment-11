import React, { use } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';

const Privet = ({children}) => {
 
 const {user,loading}=use(AuthContext)
 //console.log(user);
 const location = useLocation();
 //console.log(location);
  if (loading) {
    return<div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
  }
    if (user ) {
         return children;
    }

    return <Navigate state={location.pathname} to="/auth/login"></Navigate>
};

export default Privet;