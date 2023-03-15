import React from 'react';
import logo from '../images/header-logo.svg'
import { Link } from 'react-router-dom'

interface Props {
  url: string;
  handleClickExit: () => void;
  title: string;
}

function Header({url, handleClickExit, title}: Props) {

  function click() {
    if (title === 'Выйти') {
      localStorage.removeItem('jwt')
      handleClickExit()
    }
  }

  return (
    <header className="header">
      <img className="logo header__logo" src={logo} alt="логотип сайта mesto russian" />
      <Link className='header__btn-navigate' onClick={click} to={url}>{title}</Link>
    </header>
  )
}

export default  Header