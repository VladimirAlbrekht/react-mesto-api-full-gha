import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="change-avatar"
      style={{ minHeight: "125px" }}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      btnName={isLoading ? "Сохранение..." : "Сохранить"}
    >
      <input
        ref={avatarRef}
        id="change-avatar-input"
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_change-avatar_link"
        name="link"
        required
      />
      <span
        id="change-avatar-input-error"
        className="popup__input-error"
      ></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
