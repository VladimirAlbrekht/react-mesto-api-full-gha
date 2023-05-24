import React from 'react';
import PopupWithForm from './PopupWithForm.js';

//--- Компонент попапа добавления карточки ---
function DeletePlacePopup({ deleteCard:{ isOpen, card }, onClose, onOverlayClose, onDeleteCard, isRender }) {

  //---ОБРАБОТЧИКИ---
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  } 
  
  //---РАЗМЕТКА JSX---
  return (
    <PopupWithForm
    title='Вы уверены?'
    name='confirm'
    btnName={isRender ? 'Удаление...' : 'Да'}
    isOpen={isOpen}
    onClose={onClose}
    onOverlayClose={onOverlayClose}
    onSubmit={handleSubmit}>
    </PopupWithForm>   
  )
}

export default DeletePlacePopup;