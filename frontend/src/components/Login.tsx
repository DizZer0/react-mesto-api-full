import React from 'react'

interface Props {
  handleAuthorizationInfo: ({email, password}: {email: string, password: string}) => void
}

const Login = ({handleAuthorizationInfo}: Props) => {
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
 handleAuthorizationInfo({email, password})
}

  return (
    <form className='form-auth' onSubmit={handleSubmit}>
      <h2 className='form-auth__title'>Вход</h2>
      <fieldset className='form-auth__fieldset'>
        <input name='email' className='form-auth__input' value={email} onChange={handleChangeEmail} type='email' placeholder='Email'/>
        <input name='password' className='form-auth__input' value={password} onChange={handleChangePassword} type='password' placeholder='Пароль'/>
      </fieldset>
      <button className='form-auth__btn' type='submit'>Войти</button>
    </form>
  )
}

export default Login