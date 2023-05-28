import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRoute.js";
import React, { useEffect } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/Api.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import DeletePlacePopup from "./DeletePlacePopup.js";
import Register from "./Register.js";
import Login from "./Login.js";
import InfoTooltip from "./InfoTooltip.js";

import * as auth from "../utils/auth.js";
import { checkToken } from '../utils/auth.js';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlaceClick] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarClick] = React.useState(false);
  const [isInfoTooltip, setInfoTooltip] = React.useState({
    isOpen: false,
    successful: false,
  });

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    element: {},
  });
  const [selectedCardDeleteConfirm, setSelectedCardDeleteConfirm] =
    React.useState({ isOpen: false, card: {} });

  const [isLoading, setIsLoading] = React.useState(false);

  //состояния авторизации пользователя и его данных
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  //Подгружаем данные пользователя
  React.useEffect(() => {
    if (loggedIn) {
      api.getUserData()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

//Подгружаем карточки на страницу при входе пользователя
  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);


  //Сохраняем изменения данных пользователя
  function handleUpdateUser(newUserData) {
    setIsLoading(true);
    api
      .saveUserChanges(newUserData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //Добавляем слушатели
  function handleLoggedIn() {
    setLoggedIn(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarClick(true);
  }
  function handleEditProfileClick() {
    setIsEditProfileClick(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlaceClick(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ ...selectedCard, isOpen: true, element: card });
  }

  function handleInfoTooltip(result) {
    setInfoTooltip({ ...isInfoTooltip, isOpen: true, successful: result });
  }

  function handleOverlayClickClose(evt) {
    if (evt.target.classList.contains("popup")) closeAllPopups();
  }

  //сохраняем изменение аватара пользователя
  function handleUpdateAvatar(newLink) {
    setIsLoading(true);
    api
      .changedAvatar(newLink)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  //Закрытие всех попапов
  function closeAllPopups() {
    setIsEditAvatarClick(false);
    setIsEditProfileClick(false);
    setIsAddPlaceClick(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
    setSelectedCardDeleteConfirm({
      ...selectedCardDeleteConfirm,
      isOpen: false,
    });
    setInfoTooltip(false);
  }

  //Добавляем и убираем лайки
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Удаляем карточку с сервера
  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCardServer(card._id)
      .then(() => {
        const newCards = cards.filter((c) =>
          c._id === card._id ? false : true
        );
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //Добавляем новую карточку на сервер
  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true);
    api
      .postNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //обработчик регистрации пользователя
  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then((data) => {
        if (data) {
          handleInfoTooltip(true);
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip(false);
      });
  }

  //обработчик авторизации пользователя
  function handleLogin(password, email) {
    auth
      .login(password, email)
      .then(res => {{
          setEmail(email);
          handleLoggedIn();
          navigate("/");
        }
      })
      .catch((err) => {
        handleInfoTooltip(false);
        console.log(err);
      });
  }

  //обработчик выхода пользователя
  function handleSignOut() {
    console.log("exit");
    setLoggedIn(false);
    setEmail("");
    navigate("/sign-in");
  }

  // Повторная автоматическая авторизация при перезагрузке страницы
  useEffect(() => {
    checkToken()
      .then((res) => {
        if (res) {
          setEmail(res.email);
          handleLoggedIn();
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
        <Header email={loggedIn ? email : ''} onSignOut={handleSignOut} />
          <Routes>
            <Route
              path="/*"
              element={
                <ProtectedRouteElement
                  exact
                  path="/"
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  element={Main}
                />
              }
            />
            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegister} />}
            />
          </Routes>
          <Footer />
          <InfoTooltip
            result={isInfoTooltip}
            onClose={closeAllPopups}
            onOverlayClose={handleOverlayClickClose}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <DeletePlacePopup
            deleteCard={selectedCardDeleteConfirm}
            onClose={closeAllPopups}
            onOverlayClose={handleOverlayClickClose}
            onDeleteCard={handleCardDelete}
            isLoading={isLoading}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
