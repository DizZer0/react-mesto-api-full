import React from 'react';
import Page from './Page'
import Login from './Login'
import Register from './Register';
import Header from './Header';
import InfoTooltip from './InfoTooltip'
import { Routes, Route, useNavigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import authApi from '../utils/AuthApi';

function App() {
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false)
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState<boolean>(false)
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false)
  const navigate = useNavigate()

  function sendUserToken(token: string) {
    authApi.getValidityToken(token)
      .then(res => {
        handleLoggedIn()
      })
      .catch(err => console.log(err))
  }

  function handleAuthorizationInfo(data: {email: string, password: string}) {
    authApi.postAuthorizationInfo(data)
      .then(res => {
        if(res.token) {
          localStorage.setItem('jwt', res.token)
          sendUserToken(res.token)
        }
      })
      .catch(err => {
        console.log(err)
        setIsInfoTooltipPopupOpen(true)
        setIsSuccess(false)
      })
  }

  function handleClickExit() {
    setLoggedIn(false)
  }

  function handleLoggedIn() {
    setLoggedIn(true)
    navigate('/')
  }

  function handleClickPopupExit () {
    setIsInfoTooltipPopupOpen(false)
  }

  function handleRegisterInfo(data: {email: string, password: string}) {
    authApi.postRegistorInfo(data)
      .then(res => {
        setIsInfoTooltipPopupOpen(true)
        setIsSuccess(true)
      })
      .catch(err => {
        console.log(err)
        setIsInfoTooltipPopupOpen(true)
        setIsSuccess(false)
      })
  }

  React.useEffect(() => {
    authApi.getValidityToken(localStorage.getItem('jwt'))
      .then(res => {
        if (res === undefined) {
          setLoggedIn(false)
        } else {
          handleLoggedIn()
        }
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <div className="page">
      <InfoTooltip isOpen={isInfoTooltipPopupOpen} handleClickPopupExit={handleClickPopupExit} isSuccess={isSuccess}/>
      <Header handleClickExit={handleClickExit}/>
      <Routes>
        <Route path='/' element={<ProtectedRoute component={Page} loggedIn={loggedIn}/>} />
        <Route path='/signin' element={<Login  handleAuthorizationInfo={handleAuthorizationInfo}/>} /> 
        <Route path='/signup' element={<Register handleRegisterInfo={handleRegisterInfo}/>} />
      </Routes>
    </div>
  );
}

export default App;
