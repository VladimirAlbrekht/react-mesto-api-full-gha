import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

//--- Компонент основного контента страницы ---
function Main(props) { 
  const currentUser = React.useContext(CurrentUserContext);

  //---РАЗМЕТКА JSX---
  return (
    <main className="container">
      <section className="profile page__center">
        <div className="profile__content">
          <div className="profile__pic">
            <img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar" />
            <button className="profile__change-btn" type="button" aria-label="Изменить аватар пользователя" onClick={props.onEditAvatar} />
          </div>
          <div className="profile__info">
            <div className="profile__row">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button className="profile__edit-btn" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile} />
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-btn" type="button" aria-label="Добавить фото" onClick={props.onAddPlace} />
      </section>
        
      <section className="elements page__center" aria-label="Фотографии">
        {props.cards.map((item) => (
          <Card
            key={item['_id']}
            card={item}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onDeletePlace} />)
        )}
      </section>
    </main>
  );
}

export default Main;
  