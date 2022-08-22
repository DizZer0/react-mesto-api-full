import React from 'react'
import Header from './Header'
import { Link } from 'react-router-dom'

const Register = (props) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleChangeEmail(e) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e) {
    setPassword(e.target.value)
  }

  function handleRegisterInfo(e) {
    e.preventDefault()
    props.handleRegisterInfo({email, password})
  }

  return (
    <>
      <Header url={'/sign-in'} title={'Войти'}/>
      <form action="#" className='form-auth' onSubmit={handleRegisterInfo} name='register'>
        <h2 className='form-auth__title'>Регистрация</h2>
        <fieldset className='form-auth__fieldset'>
          <input name='email' onChange={handleChangeEmail} value={email} className='form-auth__input' type='email' placeholder='Email'/>
          <input name='password' onChange={handleChangePassword} value={password} className='form-auth__input' type='password' placeholder='Пароль'/>
        </fieldset>
        <button type='submit' className='form-auth__btn'>Зарегистрироваться</button>
        <Link className='form-auth__link' to='/sign-in'>Уже зарегистрированы? Войти</Link>
      </form>
      
    </>
  )
}

export default Register