import React from "react";
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({component: Component, ...props}) => {
  const loggedIn = props.loggedIn

  if(loggedIn === 'true') {
    return <Component {...props}/>
  } else {
    return  <Navigate to='/sign-in' />
  }
}

export default ProtectedRoute