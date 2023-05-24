import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

//--- Компонент карточки с фото ---
function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `element__trash ${isOwn ? 'element__trash_visible' : 'element__trash_hidden'}`
  ); 

  const isLiked = props.card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like ${isLiked ? 'element__like_active' : ''}`
  );


  //---ОБРАБОТЧИКИ---
  //обработчик клика по карточке
  function handleClick() {
    props.onCardClick(props.card);
  }

  //обработчик клика по кнопке лайка
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  // обработчик клика по кнопке удаления
  function handleTrashClick() {
    props.onCardDelete(props.card);
  }
  
  //---РАЗМЕТКА JSX---
  return (
    <article className="element">
      <img  className="element__pic" src={props.card.link} alt={`Фото ${props.card.name}`} onClick={handleClick}/>
      <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить карточку" onClick={handleTrashClick} />
      <div className="element__desc">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-group">
          <button className={cardLikeButtonClassName} type="button" aria-label="Лайкнуть" onClick={handleLikeClick}/>
          <p className="element__sum-like">{props.card.likes.length}</p>
        </div>
       </div>
    </article>
  )
}
    
export default Card;