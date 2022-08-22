import React from 'react'
import Header from './Header'
import authApi from '../utils/AuthApi'

const Login = (props) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

function handleAuthorizationInfo(e) {
  e.preventDefault()
  props.handleAuthorizationInfo({email, password})
}

  return (
    <>
      <Header url={'/sign-up'} title={'Регистрация'}/>
      <form className='form-auth' onSubmit={handleAuthorizationInfo}>
        <h2 className='form-auth__title'>Вход</h2>
        <fieldset className='form-auth__fieldset'>
          <input name='email' className='form-auth__input' value={email} onChange={handleChangeEmail} type='email' placeholder='Email'/>
          <input name='password' className='form-auth__input' value={password} onChange={handleChangePassword} type='password' placeholder='Пароль'/>
        </fieldset>
        <button className='form-auth__btn' type='submit'>Войти</button>
      </form>
    </>
  )
}

export default Login