import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import useFormWithValidation from '../hooks/useForm';


//--- Компонент попапа изменения профиля ---
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isRender, onOverlayClose }) {
  // const avatarRef = React.useRef();
  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  // ---ОБРАБОТЧИКИ---
  function handleSubmit(e) {
    e.preventDefault();
    // onUpdateAvatar(avatarRef.current.value);
    onUpdateAvatar(values.link);
  }

  // ---ЭФФЕКТЫ---
  React.useEffect(() => {
    resetForm()
  }, [isOpen, resetForm]); 

  
  return (
    <PopupWithForm
      title='Обновить аватар'
      name='change-avatar'
      isOpen={isOpen}
      btnName={isRender ? 'Сохранение...' : 'Сохранить'}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <input value={values.link || ''} onChange={handleChange}  id="change-avatar-input" type="url" placeholder="Ссылка на картинку" className="popup__input popup__input_change-avatar_link" name="link" required />
      <span id="change-avatar-input-error" className="popup__input-error">{errors.link || ''}</span>
    </PopupWithForm>
  )
}
    
export default EditAvatarPopup;
    