import logo from "../images/logo.svg";
import React, { useState } from "react";
import { Routes, Link, Route } from "react-router-dom";

// Компонент хедера
function Header({ email, onSignOut }) {
  const [isClicked, setIsClicked] = useState(false);

  function handleClickMenu() {
    setIsClicked(!isClicked);
  }

  return (
    <header className="header">
      <div
        className={`header__container ${
          isClicked ? "header__container_small-menu" : ""
        }`}
      >
        <Routes>
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            }
          />
          <Route
            exact
            path="/"
            element={
              <>
                <div
                  className={`header__menu-btn ${
                    isClicked ? "header__menu-btn_close" : ""
                  }`}
                  onClick={handleClickMenu}
                >
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div
                  className={`header__info ${
                    isClicked ? "header__info_small-menu" : ""
                  }`}
                >
                  <p className="header__email">{email}</p>
                  <button
                    onClick={() => {
                      onSignOut();
                      handleClickMenu();
                    }}
                    className="header__link header__button"
                  >
                    Выйти
                  </button>
                </div>
              </>
            }
          />
        </Routes>
      </div>
      <div className="header__container_mobile">
        <img
          className={`logo ${isClicked ? "logo_small-menu" : ""}`}
          src={logo}
          alt="Логотип Место"
        />
      </div>
    </header>
  );
}

export default Header;
