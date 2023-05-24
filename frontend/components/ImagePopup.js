import React from "react";

function ImagePopup({
  onClose,
  card: {
    isOpen,
    element: { name, link },
  },
}) {
  return (
    <section
      id="popup-image"
      className={`popup popup_open-image ${isOpen ? "popup_opened" : false}`}
    >
      <div className="popup__container popup__container_image">
        <img
          className="popup__image popup__image_picture"
          src={link}
          alt={`Фото ${name}`}
        />
        <h2 className="popup__title popup__title_picture">{name}</h2>
        <button
          onClick={onClose}
          className="popup__close popup__close_image-form"
          type="button"
          aria-label="Закрыть окно"
        />
      </div>
    </section>
  );
}

export default ImagePopup;
