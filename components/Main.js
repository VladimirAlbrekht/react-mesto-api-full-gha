import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content">
          <div
            className="profile__avatar"
            style={{
              backgroundImage: `url(${currentUser.avatar})`,
              backgroundSize: "cover",
            }}
          >
            <button
              className="profile__change-btn"
              type="button"
              onClick={props.onEditAvatar}
              aria-label="Изменить аватар пользователя"
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__heading">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                onClick={props.onEditProfile}
                aria-label="Редактировать"
              ></button>
            </div>
            <p className="profile__status">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
          aria-label="Добавить"
        ></button>
      </section>
      <section className="elements" aria-label="Фотографии">
        <ul className="elements__list">
          {props.cards.map((item) => (
            <Card
              key={item["_id"]}
              card={item}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
export default Main;
