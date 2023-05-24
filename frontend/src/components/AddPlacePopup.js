import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleAddName(e) {
    setName(e.target.value);
  }

  function handleAddLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={isOpen}
      btnName={isLoading ? "Сохранение..." : "Создать"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="card-name-input"
        type="text"
        placeholder="Название"
        className="popup__input popup__input_add-card_name"
        name="name"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={handleAddName}
      />
      <span id="card-name-input-error" className="popup__input-error"></span>
      <input
        id="card-link-input"
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_add-card_link"
        name="link"
        required
        value={link}
        onChange={handleAddLink}
      />
      <span id="card-link-input-error" className="popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
