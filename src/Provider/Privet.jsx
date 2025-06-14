import React, { use } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router';

const Privet = ({children}) => {
 
 const {user,loading}=use(AuthContext)
 //console.log(user);
 const location = useLocation();
 //console.log(location);
  if (loading) {
   return <div><span className="loading loading-spinner loading-xs"></span>
    <span className="loading loading-spinner loading-sm"></span>
    <span className="loading loading-spinner loading-md"></span>
   </div>   }
    if (user ) {
         return children;
    }

    return <Navigate state={location.pathname} to="/auth/login"></Navigate>
};

export default Privet;