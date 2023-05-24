import React from 'react';
import useEscapeClose from '../hooks/useEscapeClose.js';

//--- Компонент попапа с картинкой ---
function ImagePopup({ onClose, onOverlayClose, card:{ isOpen, element:{name, link} } }) {

  //---Закрытие по Esc ---
  useEscapeClose(isOpen, onClose);

  //---РАЗМЕТКА JSX---
  return (
    <section className={`popup popup_type_image ${isOpen ? 'popup_opened' : false}`} onClick={onOverlayClose}>
      <div className="popup__container popup__container_type_image">
        <img className="popup__photo" src={link} alt={`Фото ${name}`} />
        <h2 className="popup__photo-title">{name}</h2>
        <button onClick={onClose} className="popup__close" type="button" aria-label="Закрыть окно" />
      </div>
    </section>
  )
}
    
export default ImagePopup;
    