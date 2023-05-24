import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import useFormWithValidation from '../hooks/useForm';

//--- Компонент попапа добавления карточки ---
function AddPlacePopup({ isOpen, onClose, onOverlayClose, onAddPlace, isRender}) {

  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();
  
  //---ОБРАБОТЧИКИ---
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  //---ЭФФЕКТЫ---
  React.useEffect(() => {
    resetForm()
  }, [isOpen, resetForm]); 
  
  
  //---РАЗМЕТКА JSX---
  return (
    <PopupWithForm
      title='Новое место'
      name='add-card'
      isOpen={isOpen}
      btnName={isRender ? 'Сохранение...' :'Создать'}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <input value={values.name || ''} onChange={handleChange} id="card-name-input" type="text" placeholder="Название" className="popup__input popup__input_add-card_name" name="name" minLength="2" maxLength="30" required />
      <span id="card-name-input-error" className="popup__input-error">{errors.name || ''}</span>
      <input value={values.link || ''} onChange={handleChange} id="card-link-input" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_add-card_link" name="link" required />
      <span id="card-link-input-error" className="popup__input-error">{errors.link || ''}</span>
    </PopupWithForm>
  )
}
      
export default AddPlacePopup;