import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  handleRegisterInfo: ({email, password}: {email: string, password: string}) => void
}

const Register = ({handleRegisterInfo}: Props) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    handleRegisterInfo({email, password})
  }

  return (
    <form action="#" className='form-auth' onSubmit={handleSubmit} name='register'>
      <h2 className='form-auth__title'>Регистрация</h2>
      <fieldset className='form-auth__fieldset'>
        <input name='email' onChange={handleChangeEmail} value={email} className='form-auth__input' type='email' placeholder='Email'/>
        <input name='password' onChange={handleChangePassword} value={password} className='form-auth__input' type='password' placeholder='Пароль'/>
      </fieldset>
      <button type='submit' className='form-auth__btn'>Зарегистрироваться</button>
      <Link className='form-auth__link' to='/signin'>Уже зарегистрированы? Войти</Link>
    </form>
  )
}

export default Register