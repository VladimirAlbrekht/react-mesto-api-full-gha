import logo from '../images/logo-white.svg';
import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom';


//--- Компонент шапки сайта ---
function Header({ email, onSignOut }) {
  const [isClicked, setIsClicked] = useState(false);

  //---ОБРАБОТЧИКИ---
  function handleClickMenu() {
    setIsClicked(!isClicked)
  }

  //---РАЗМЕТКА JSX---
  return (
    <header className="header page__center">
      <div className={`header__box ${isClicked ? 'header__box_small-menu' : ''}`}>
        <img className={`logo ${isClicked ? 'logo_small-menu' : ''}`} src={logo} alt="Логотип Место" />
        <Route path="/sign-in">
          <Link to='sign-up' className='header__link'>Регистрация</Link>
        </Route>
        <Route path="/sign-up">
          <Link to='sign-in' className='header__link'>Войти</Link>
        </Route>
        <Route exact path="/">
          <div className={`header__menu-btn ${isClicked ? 'header__menu-btn_close' : ''}`} onClick={handleClickMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>
            <div className={`header__user-box ${isClicked ? 'header__user-box_small-menu' : ''}`}>
              <p className='header__email'>{email}</p>
              <button
                onClick={() => {
                  onSignOut();
                  handleClickMenu();
                }}
                className='header__link header__button'>Выйти</button>
            </div>
        </Route>
      </div>     
    </header>
  )
}

export default Header;
