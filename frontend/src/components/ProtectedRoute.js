import React, { Children, Component } from "react";
import { Navigate, Route } from 'react-router-dom'
import Page from './Page'

const ProtectedRoute = ({component: Component, ...props}) => {
  const loggedIn = props.loggedIn

  if(loggedIn === 'true') {
    return <Component {...props}/>
  } else {
    return  <Navigate to='/sign-in' />
  }
}

export default ProtectedRoute