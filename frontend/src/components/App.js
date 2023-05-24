import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute.js";

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeletePlacePopup from './DeletePlacePopup.js';
import Register from './Register.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';

import * as auth from '../utils/auth.js';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({});

  // состояния попапов
  const [isEditProfilePopupOpen, setEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarClick] = React.useState(false);
  const [isInfoTooltip, setInfoTooltip] = React.useState({isOpen: false, successful: false});

  // состояния карточек
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({isOpen: false, element: {}});
  const [selectedCardDeleteConfirm, setSelectedCardDeleteConfirm] = React.useState({isOpen: false, card: {}});

  // состояние обработки запроса
  const[renderSaving, setRenderSaving] = React.useState(false);

  //состояния авторизации пользователя и его данных
  const[loggedIn, setLoggedIn] = React.useState(false);
  const[email, setEmail] = React.useState('');
  
  //---ЭФФЕКТЫ---
  //при загрузке страницы получаем данные карточек
  React.useEffect(() => {
    if(loggedIn){
      api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }, [loggedIn]);

  //при загрузке если получаем пользователя то перенаправляем его
  React.useEffect(() => {
    api.getUserData()
      .then(data => {
        handleLoggedIn();
        setEmail(data.email);
        setCurrentUser(data);
        history.push('/');
      })
      .catch(err => {
        console.log(err);
      })
  }, [history, loggedIn]);
    
  //---ОБРАБОТЧИКИ---
  function handleLoggedIn() {
    setLoggedIn(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarClick(true);
  }

  function handleEditProfileClick() {
    setEditProfileClick(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceClick(true);
  }

  function handleCardClick(card) {
    setSelectedCard({...selectedCard, isOpen: true, element: card});
  }
  
  function handleDeletePlaceClick(card) {
    setSelectedCardDeleteConfirm({...selectedCardDeleteConfirm, isOpen: true, card: card});
  }

  function handleInfoTooltip(result) {
    setInfoTooltip({...isInfoTooltip, isOpen: true, successful: result});
  }

  function closeAllPopups() {
    setEditAvatarClick(false);
    setEditProfileClick(false);
    setAddPlaceClick(false);
    setSelectedCard({...selectedCard, isOpen: false});
    setSelectedCardDeleteConfirm({...selectedCardDeleteConfirm, isOpen: false});
    setInfoTooltip(false);
  }

  function handleOverlayClickClose(evt) {
    if (evt.target.classList.contains("popup")) closeAllPopups();
  }

  //изменение данных пользователя
  function handleUpdateUser(newUserData) {
    setRenderSaving(true);
    api.saveUserChanges(newUserData)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setRenderSaving(false));
  }

  //изменение аватара пользователя
  function handleUpdateAvatar(newAvatarLink) {
    setRenderSaving(true);
    api.changedAvatar(newAvatarLink)
      .then(data => {
        setCurrentUser({...currentUser, avatar: data.avatar});
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setRenderSaving(false));
  }

  //добавление новой карточки
  function handleAddPlaceSubmit(cardData) {
    setRenderSaving(true);
    api.postNewCard(cardData)
      .then(newCard => {
        setCards([newCard, ...cards]); 
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setRenderSaving(false));
  }

  //постановка/снятие лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards((state)=> state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  } 

  //удаление карточки
  function handleCardDelete(card) {
    setRenderSaving(true);
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id === card._id ? false : true);
        setCards(newCards);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setRenderSaving(false));
  } 

  //обработчик регистрации пользователя
  function handleRegister(password, email){
    auth.register(password, email)
      .then(data => {
        if(data){
          handleInfoTooltip(true);
          history.push('/sign-in');
        } 
      })
      .catch(err => {
        console.log(err);
        handleInfoTooltip(false);
      })
  }

  //обработчик авторизации пользователя
  function handleLogin (password, email) {
    auth.login(password, email)
      .then(res => {
        setEmail(email);
        handleLoggedIn();
        history.push('/');
      })
      .catch(err => {
        handleInfoTooltip(false);
        console.log(err);
      })
  }
  
  //обработчик выхода пользователя
  function handleSignOut() {
    auth.logout()
      .then(res => {
          setLoggedIn(false);
          setEmail('');
          history.push('/sign-in');
      })
      .catch(err => {
        console.log(err);
      })
  }

  //---РАЗМЕТКА JSX---
  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header email={email} onSignOut={handleSignOut} />

      <Switch>
        <ProtectedRoute
          exact path='/'
          loggedIn={loggedIn}
          component={Main}
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick} 
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onDeletePlace={handleDeletePlaceClick}
        />
          
        <Route path="/sign-in">
          <Login onLogin={handleLogin}/>
        </Route>

        <Route path="/sign-up">
          <Register onRegister={handleRegister}/>
        </Route>

        <Route>
          {loggedIn ? (
            <Redirect to="/" />
          ) : (
            <Redirect to="/sign-in" />
          )}
        </Route>
      </Switch>

      <Footer />

      <InfoTooltip result={isInfoTooltip} onClose={closeAllPopups} onOverlayClose={handleOverlayClickClose}/>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} onOverlayClose={handleOverlayClickClose} />

      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={handleOverlayClickClose}
        onUpdateUser={handleUpdateUser}
        isRender={renderSaving}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={handleOverlayClickClose}
        onUpdateAvatar={handleUpdateAvatar}
        isRender={renderSaving}
      /> 

      <AddPlacePopup 
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={handleOverlayClickClose}
        onAddPlace={handleAddPlaceSubmit}
        isRender={renderSaving}
      />

      <DeletePlacePopup
        deleteCard={selectedCardDeleteConfirm}
        onClose={closeAllPopups}
        onOverlayClose={handleOverlayClickClose}
        onDeleteCard={handleCardDelete}
        isRender={renderSaving}
      />     
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
