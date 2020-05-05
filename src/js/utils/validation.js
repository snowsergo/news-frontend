import { message } from "../constants/validation-messages";
import {
  emailRgistrationInput,
  passwordRgistrationInput,
  nameRgistrationInput,
  emailEnterInput,
  passwordEnterInput,
  enterForm,
  registrationForm,
} from "../../main/index.js";

export default class Validation {
  constructor() {}

  checkEmailRegistration() {
    const Reg = /\w+([-.]*\w*)*?@\w+\.[a-z]{2,}/;
    const str = registrationForm.elements.emailregistration.value;
    return Reg.test(str);
  }

  checkEmailEnter() {
    const Reg = /\w+([-.]*\w*)*?@\w+\.[a-z]{2,}/;
    const str = registrationForm.elements.email-enter.value;
    return Reg.test(str);
  }

  checkNameRegistration() {
    const Reg = /(^[А-ЯЁ][а-яё]+(( [А-ЯЁ][а-яё]+)+)?$)|(^[A-Z][a-z]+(( [A-Z][a-z]+)+)?$)|(^[a-z][a-z]+(( [a-z][a-z]+)+)?$)|(^[а-яё][а-яё]+(( [а-яё][а-яё]+)+)?$)/;
    const str = registrationForm.elements.nameregistration.value;
    return Reg.test(str);
  }

  checkNameEnter() {
    const Reg = /(^[А-ЯЁ][а-яё]+(( [А-ЯЁ][а-яё]+)+)?$)|(^[A-Z][a-z]+(( [A-Z][a-z]+)+)?$)|(^[a-z][a-z]+(( [a-z][a-z]+)+)?$)|(^[а-яё][а-яё]+(( [а-яё][а-яё]+)+)?$)/;
    const str = registrationForm.elements.nameregistration.value;
    return Reg.test(str);
  }

  //проверка ввода текста
  /*inputValidate(element) {
    const errorElement = document.querySelector(`#error-${element.id}`);

    if (element.value.length === 0) {
      errorElement.textContent = message.ru.validationRequired;
      errorElement.classList.add("error-message__visible");
      return false;
    }
    if (element.value.length < 2 || element.value.length > 30) {
      errorElement.textContent = message.ru.validationLenght;
      errorElement.classList.add("error-message__visible");
      return false;
    }
    errorElement.textContent = message.ru.validationDone;
    errorElement.classList.remove("error-message__visible");
    return true;
  }
*/
  //проверка ввода email
  inputEmailRegistrationValidate(element) {
    const errorElement = document.querySelector(`#error-${element.id}`);
    if (this.checkEmailRegistration()) {
      console.log(this.checkEmailRegistration());
      errorElement.textContent = message.ru.validationDone;
      errorElement.classList.remove("error-message__visible");
      return true;
    } else {
      const str = registrationForm.elements.emailregistration.value;
      errorElement.textContent = message.ru.validationEmail;
      errorElement.classList.add("error-message__visible");
      return false;
    }
  }

  //проверка ввода имени
  inputNameRegistrationValidate(element) {
    const errorElement = document.querySelector(`#error-${element.id}`);
    if (this.checkNameRegistration()) {
      console.log(this.checkNameRegistration());
      errorElement.textContent = message.ru.validationDone;
      errorElement.classList.remove("error-message__visible");
      return true;
    } else {
      const str = registrationForm.elements.nameregistration.value;
      errorElement.textContent = message.ru.validationEmail;
      errorElement.classList.add("error-message__visible");
      return false;
    }
  }

  //проверка формы регистрации yandex@yandex.ru
  registrationValidate() {
    const popupRegistration = document.querySelector(".popup__registration-button");
    if (
      nameRgistrationInput.validity.valid &&
      passwordRgistrationInput.validity.valid &&
      this.checkEmailRegistration()
    ) {
      popupRegistration.classList.add("popup__button-is-active");
      popupRegistration.removeAttribute("disabled");
    } else {
      popupRegistration.classList.remove("popup__button-is-active");
      popupRegistration.setAttribute("disabled", true);
    }
  }

  //проверка формы карточки
  cardValidate() {
    //const placeInput = document.querySelector("#place");
    const popupCardButton = document.querySelector(".popup__card-add-button");
    if (placeInput.validity.valid && this.checkLink()) {
      popupCardButton.classList.add("popup__button-is-active");
      popupCardButton.removeAttribute("disabled");
    } else {
      popupCardButton.classList.remove("popup__button-is-active");
      popupCardButton.setAttribute("disabled", true);
    }
  }

  //проверка формы карточки
  avatarValidate() {
    const popupAvatarButton = document.querySelector(
      ".popup__avatar-add-button"
    );
    if (this.checkAvatar()) {
      popupAvatarButton.classList.add("popup__button-is-active");
      popupAvatarButton.removeAttribute("disabled");
    } else {
      popupAvatarButton.classList.remove("popup__button-is-active");
      popupAvatarButton.setAttribute("disabled", true);
    }
  }

  // проверка формы пользователя
  userValidate() {
    const popupUserButton = document.querySelector(".popup__user-add-button");
    //const nameInput = document.querySelector("#name");
    //const jobInput = document.querySelector("#job");
    if (nameInput.validity.valid && jobInput.validity.valid) {
      popupUserButton.classList.add("popup__button-is-active");
      popupUserButton.removeAttribute("disabled");
    } else {
      popupUserButton.classList.remove("popup__button-is-active");
      popupUserButton.setAttribute("disabled", true);
    }
  }
  //валидация инпутов
  handleValidate(event) {
    //console.log(event.target);
    if (event.target.id === "emailregistration") {
      this.inputEmailRegistrationValidate(event.target);
      return;
    }
    if (event.target.id === "avatar") {
      this.inputAvatarValidate(event.target);
      return;
    } else {
      this.inputValidate(event.target);
      return;
    }
  }
}
