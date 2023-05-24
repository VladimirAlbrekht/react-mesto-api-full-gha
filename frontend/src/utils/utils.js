const popupEditProfileContainer = document.querySelector(".popup_edit-profile");
const popupChangeAvatar = document.querySelector(".popup_change-avatar");
const popupAddCardForm = document.forms["card-form"];
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddNewCard = document.querySelector(".profile__add-button");
const buttonChangeAvatar = document.querySelector(".profile__change-btn");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__status");
const nameInput = document.querySelector('[name="name"]');
const jobInput = document.querySelector('[name="about"]');
const popupProfileInputs =
  popupEditProfileContainer.querySelectorAll(".popup__input");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_invalid",
  activeButtonClass: "popup__button_valid",
  inputErrorClass: "popup__input_type_error",
};

export {
  config,
  popupEditProfileContainer,
  popupAddCardForm,
  buttonEditProfile,
  buttonAddNewCard,
  profileName,
  profileJob,
  nameInput,
  jobInput,
  buttonChangeAvatar,
  popupProfileInputs,
  popupChangeAvatar,
};
