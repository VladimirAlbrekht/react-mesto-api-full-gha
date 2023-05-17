import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = isOwn && (
    <button className="element__trash" onClick={handleDeleteClick} />
  );
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element">
      <img
        className="element__image"
        src={props.card.link}
        alt={`Фото ${props.card.name}`}
        onClick={handleClick}
      />
      {cardDeleteButtonClassName}
      <div className="element__info">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-group">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Лайкнуть"
            onClick={handleLikeClick}
          />
          <p className="element__like-sum">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
