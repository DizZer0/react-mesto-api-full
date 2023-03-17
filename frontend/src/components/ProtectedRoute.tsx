import React from "react";
import { Navigate, RouteProps } from 'react-router-dom'

interface ProtectedRouteProps extends RouteProps {
  component: any;
  loggedIn: boolean;
}

const ProtectedRoute = ({component: Component, ...props}: ProtectedRouteProps) => {
  const {loggedIn} = props
  
  if(loggedIn === true) {
    return <Component {...props}/>
  } else {
    return  <Navigate to='/signin' />
  }
}

export default ProtectedRoute