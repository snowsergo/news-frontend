import { message } from "../constants/validation-messages";
import { enterForm, registrationForm } from "../../main/index.js";

export default class Validation {
  constructor() {
    this.popup = "";
  }

// проверка email
  checkEmail(activePopup) {
    const Reg = /\w+([-.]*\w*)*?@\w+\.[a-z]{2,}/;
    if (activePopup === "registration") {
      const str = registrationForm.elements.emailregistration.value;
      return Reg.test(str);
    } else if (activePopup === "enter") {
      const str = enterForm.elements.emailenter.value;
      return Reg.test(str);
    }
  }

  // проверка password
  checkPassword(activePopup) {
    const Reg = /.{8,}/;
    if (activePopup === "registration") {
      const str = registrationForm.elements.passwordregistration.value;
      return Reg.test(str);
    } else if (activePopup === "enter") {
      const str = enterForm.elements.passwordenter.value;
      return Reg.test(str);
    }
  }

// проверка name
  checkName() {
    const Reg = /(^[А-ЯЁ][а-яё]+(( [А-ЯЁ][а-яё]+)+)?$)|(^[A-Z][a-z]+(( [A-Z][a-z]+)+)?$)|(^[a-z][a-z]+(( [a-z][a-z]+)+)?$)|(^[а-яё][а-яё]+(( [а-яё][а-яё]+)+)?$)/;
    const str = registrationForm.elements.name.value;
    return Reg.test(str);
  }

  //проверка ввода email
  inputEmailValidate(element) {
    if (element.id === "emailregistration") {
      this.popup = "registration";
    } else if (element.id === "emailenter") {
      this.popup = "enter";
    }
    const errorElement = document.querySelector(`#error-${element.id}`);
    if (this.checkEmail(this.popup)) {
      errorElement.textContent = message.ru.validationDone;
      errorElement.classList.remove("error-message__visible");
      return true;
    } else {
      errorElement.textContent = message.ru.validationEmail;
      errorElement.classList.add("error-message__visible");
      return false;
    }
  }

  //проверка ввода имени
  inputNameValidate(element) {
    const errorElement = document.querySelector(`#error-${element.id}`);
    if (this.checkName()) {
      errorElement.textContent = message.ru.validationDone;
      errorElement.classList.remove("error-message__visible");
      return true;
    } else {
      errorElement.textContent = message.ru.validationName;
      errorElement.classList.add("error-message__visible");
      return false;
    }
  }

  //проверка ввода пароля
  inputPasswordValidate(element) {
    if (element.id === emailregistration) {
      this.popup = "registration";
    } else if (element.id === emailenter) {
      this.popup = "enter";
    }
    const errorElement = document.querySelector(`#error-${element.id}`);
    if (this.checkPassword(this.popup)) {
      errorElement.textContent = message.ru.validationDone;
      errorElement.classList.remove("error-message__visible");
      return true;
    } else {
      errorElement.textContent = message.ru.validationPassword;
      errorElement.classList.add("error-message__visible");
      return false;
    }
  }

  //проверка формы
  formValidate() {
    if (this.popup === "registration") {
      const popupRegistration = document.querySelector(".popup__registration-button");
      if (this.checkName() && this.checkEmail(this.popup) && this.checkPassword(this.popup) ) {
        popupRegistration.classList.add("popup__button-is-active");
        popupRegistration.removeAttribute("disabled");
      } else {
        popupRegistration.classList.remove("popup__button-is-active");
        popupRegistration.setAttribute("disabled", true);
      }
    } else if (this.popup === "enter"){
      const popupEnter = document.querySelector(".popup__enter-button");
      if (this.checkEmail(this.popup) && this.checkPassword(this.popup) ) {
        popupEnter.classList.add("popup__button-is-active");
        popupEnter.removeAttribute("disabled");
      } else {
        popupEnter.classList.remove("popup__button-is-active");
        popupEnter.setAttribute("disabled", true);
    }
  }
  }


// ошибка сервера в форме регистрации
registrationMessage(message){
  const errorElement = document.querySelector('.error-message_user-registration');
  errorElement.textContent = message;
      errorElement.classList.add("error-message__visible");
}

registrationMessageRemove(){
  const errorElement = document.querySelector('.error-message_user-registration');
  errorElement.textContent = message.ru.validationDone;
      errorElement.classList.remove("error-message__visible");
}

enterMessageRemove(){
  const errorElement = document.querySelector('.error-message_user-enter');
  errorElement.textContent = message.ru.validationDone;
      errorElement.classList.remove("error-message__visible");
}


messageRemove(){
  const errorElementRegistration = document.querySelector('.error-message_user-registration');
  const errorElementEnter = document.querySelector('.error-message_user-enter');
  errorElementRegistration.textContent = message.ru.validationDone;
  errorElementEnter.textContent = message.ru.validationDone;
  errorElementRegistration.classList.remove("error-message__visible");
  errorElementEnter.classList.remove("error-message__visible");
}




// ошибка сервера в форме входа
enterMessage(message){
  const errorElement = document.querySelector('.error-message_user-enter');
  errorElement.textContent = message;
      errorElement.classList.add("error-message__visible");
}



  // валидация инпутов
  handleValidate(event) {
    if (
      event.target.id === "emailregistration" ||
      event.target.id === "emailenter"
    ) {
      this.inputEmailValidate(event.target);
      return;
    }
    if (event.target.id === "name") {
      this.inputNameValidate(event.target);
      return;
    }
    if (
      event.target.id === "passwordregistration" ||
      event.target.id === "passwordenter"
    ) {
      this.inputPasswordValidate(event.target);
      return;
    }
  }
}
