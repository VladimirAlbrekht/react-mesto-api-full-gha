import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import useFormWithValidation from '../hooks/useForm';


//--- Компонент попапа изменения профиля ---
function EditProfilePopup({ isOpen, onClose, onOverlayClose, onUpdateUser, isRender}) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, setValues, errors, isValid, setIsValid, handleChange, resetForm } = useFormWithValidation();

  //---ЭФФЕКТЫ---
  //получаем текущие значения для установки в поля попапа
  React.useEffect(() => {
    if(currentUser){
      setValues({
        name: currentUser.name,
        about: currentUser.about,
      });
      setIsValid(true);
    }
  }, [currentUser, setValues, setIsValid]); 
  
  //сбрасываем форму
  React.useEffect(() => {
    resetForm({
      name: currentUser.name,
      about: currentUser.about,
    });
    setIsValid(true);
  }, [isOpen, resetForm, setIsValid, currentUser.name, currentUser.about]); 
    

  //---ОБРАБОТЧИКИ---
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  } 

  //---РАЗМЕТКА JSX---
  return (
    <PopupWithForm 
      title='Редактировать профиль'
      name='edit' isOpen={isOpen}
      btnName={isRender ? 'Сохранение...' : 'Сохранить'}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
        <input value={values.name || ''} onChange={handleChange} id="name-input" type="text" placeholder="Имя" className="popup__input popup__input_text_name" name="name" minLength="2" maxLength="40" required />
        <span id="name-input-error" className="popup__input-error">{errors.name || ''}</span>
        <input value={values.about || ''} onChange={handleChange} id="job-input" type="text" placeholder="О себе" className="popup__input popup__input_text_job" name="about" minLength="2" maxLength="200" required />
        <span id="job-input-error" className="popup__input-error">{errors.about || ''}</span>
    </PopupWithForm>
  )
}
    
export default EditProfilePopup;
    