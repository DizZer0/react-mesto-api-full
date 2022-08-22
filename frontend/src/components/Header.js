import React from 'react';
import logo from '../images/header-logo.svg'
import { Link } from 'react-router-dom'
/* Мне не очень нравиться реализация <Link /> приходится далеко прокидывать функцию.
 а если нажать на кнопку находясь на регистрации или авторизации, тогда функция срабатывает просто так.
 Можно ли это как-то улучшить? Буду благодарен за объяснение или ссылку  */
function Header(props) {
  function click(e) {
    if(e.target.text === 'Выйти') {
      localStorage.removeItem('jwt')
      props.handleClickExit()
    }
  }
  return (
    <header className="header">
      <img className="logo header__logo" src={logo} alt="логотип сайта mesto russian" />
      <Link className='header__btn-navigate' onClick={click} to={props.url}>{props.title}</Link>
    </header>
  )
}

export default  Header