import React from "react";

function PopupWithForm({
  name,
  title,
  btnName,
  isOpen,
  onClose,
  children,
  onSubmit,
}) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : false}`}
    >
      <div className={`popup__container popup__container_type_${name}`}>
        <h3 className={`popup__title popup__title_type_${name}`}>{title}</h3>
        <form
          className={`popup__form popup__form_${name}`}
          name={`popup-form-${name}`}
          onSubmit={onSubmit}
        >
          <>{children}</>
          <button
            className={`popup__submit-btn popup__submit-btn_type_${name}`}
            type="submit"
          >
            {btnName}
          </button>
        </form>
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
          aria-label="Закрыть окно"
        />
      </div>
    </section>
  );
}

export default PopupWithForm;
