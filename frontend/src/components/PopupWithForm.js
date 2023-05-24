import React from 'react';
import useEscapeClose from '../hooks/useEscapeClose.js';

//--- Компонент попапов ---
function PopupWithForm({
  name,
  title,
  btnName,
  isOpen,
  onClose,
  children,
  onSubmit,
  onOverlayClose,
  isDisabled = false,
}) {
  
  //---Закрытие по Esc ---
  useEscapeClose(isOpen, onClose);

  //---РАЗМЕТКА JSX---
  return (
    <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : false}`} onClick={onOverlayClose}>
      <div className={`popup__container popup__container_type_${name}`}>
        <h3 className={`popup__title popup__title_type_${name}`}>{title}</h3>
        <form className="popup__form" name={`popup-form-${name}`} noValidate onSubmit={onSubmit}>
          <>{children}</>
          <button className={`popup__submit-btn 
            popup__submit-btn_type_${name} 
            ${isDisabled && 'popup__submit-btn_inactive'}`}
            type="submit"
            disabled={isDisabled}
          >
            {btnName}
          </button>
        </form>
        <button onClick={onClose} className="popup__close" type="button" aria-label="Закрыть окно"></button>
      </div>
    </section>
  )
}
  
export default PopupWithForm;
  
