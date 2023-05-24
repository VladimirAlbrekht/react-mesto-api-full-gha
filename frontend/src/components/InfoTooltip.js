import React from 'react';
import useEscapeClose from '../hooks/useEscapeClose.js';
import ok from '../images/ok.png';
import err from '../images/err.png';

//--- Компонент всплывающих подсказок ---
function InfoTooltip({ onClose, onOverlayClose, result: { isOpen, successful } }) {

  //---Закрытие по Esc ---
  useEscapeClose(isOpen, onClose);

  //---РАЗМЕТКА JSX---
  return (
    <section className={`popup popup_type_info ${isOpen ? 'popup_opened' : false}`} onClick={onOverlayClose}>
      <div className="popup__container popup__container_type_info">
        <img className="popup__photo popup__photo_type_info" src={successful ? ok : err} alt='Значок результата операции' />
        <h2 className={`popup__title popup__title_type_info`}>{successful ? 'Вы успешно зарегестрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
        <button onClick={onClose} className="popup__close" type="button" aria-label="Закрыть окно" />
      </div>
    </section>
  )
}
    
export default InfoTooltip;
    