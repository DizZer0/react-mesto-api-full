import {useState, useEffect} from 'react';
import logo from '../images/header-logo.svg'
import { Link, useLocation } from 'react-router-dom'

interface Props {
  handleClickExit: () => void;
}

function Header({handleClickExit}: Props) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const location = useLocation().pathname
  console.log(location)

  function switchingContent() {
    if (location === '/signup'){
      setTitle('Войти')
      setUrl('/signin')
    } else if (location === '/signin'){
      setTitle('Регистрация')
      setUrl('/signup')
    } else {
      setTitle('Выйти')
      setUrl('/signin')
    }
  }

  function click() {
    if (title === 'Выйти') {
      localStorage.removeItem('jwt')
      handleClickExit()
    }
  }

  useEffect(() => {
    switchingContent()
  })

  return (
    <header className="header">
      <img className="logo header__logo" src={logo} alt="логотип сайта mesto russian" />
      <Link className='header__btn-navigate' onClick={click} to={url}>{title}</Link>
    </header>
  )
}

export default  Header