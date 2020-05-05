import "./index.css";

import MainApi from "../js/api/mainapi.js";
import NewsApi from "../js/api/newsapi.js";
import Form from "../js/components/form.js";
import Header from "../js/components/header.js";
import NewsCard from "../js/components/newscard.js";
import NewsCardList from "../js/components/newscardlist.js";
import Popup from "../js/components/popup.js";
import Validation from "../js/utils/validation.js";


const page = document.querySelector(".page");
const popupEnter = document.querySelector(".popup-enter");
const popupRegistration = document.querySelector(".popup-registration");
const popupSuccess = document.querySelector(".popup-success");

// const menuButton = document.querySelector(".header__menu-button");
// const loginButton = document.querySelector(".header__login-button");
// const logoutButton = document.querySelector(".header__logout-button");

const popupObj = new Popup();
const headerObj = new Header();
const validObj = new Validation();


export const enterForm = document.forms.enter;
export const registrationForm = document.forms.registration;

export const emailRgistrationInput = document.querySelector("#emailregistration");
export const passwordRgistrationInput = document.querySelector("#password-registration");
export const nameRgistrationInput = document.querySelector("#name-registration");

export const emailEnterInput = document.querySelector("#email-enter");
export const passwordEnterInput = document.querySelector("#password-enter");

const linkInput = document.querySelector("#link");
const avatarInput = document.querySelector("#avatar");


//открытие закрытие попапов
function handlePopup(event) {

  if (event.target.classList.contains("header__login-button")) {
    if (headerObj.MobileMenuIsOpen === true) {
      //console.log('ммобильное меню открыто');
      headerObj.handleMobileMenu();
      headerObj.hideHamburger();
      headerObj.MobileMenuIsOpen = false;
    }
      popupObj.open(popupEnter);
      return;
  }

  if (event.target.classList.contains("popup__link_enter")) {
    popupObj.removeErrorMessages();
    popupObj.close(popupRegistration);
    popupObj.open(popupEnter);
    return;
  }
  if (event.target.classList.contains("popup__link_success")) {
    popupObj.close(popupSuccess);
    popupObj.open(popupEnter);
    return;
  }
  if (event.target.classList.contains("popup__link_registration")) {
    popupObj.close(popupEnter);
    popupObj.removeErrorMessages();
    popupObj.open(popupRegistration);
    return;
  }
  if (event.target.id === "enter-close") {
    if (headerObj.MobileMenuIsOpen === false) {
      headerObj.displayHamburger();
    }
    enterForm.reset();
    popupObj.close(popupEnter);
    popupObj.removeErrorMessages();
    return;
  }

  if (event.target.id === "registration-close") {
    if (headerObj.MobileMenuIsOpen === false) {
      headerObj.displayHamburger();
    }
    registrationForm.reset();
    popupObj.close(popupRegistration);
    popupObj.removeErrorMessages();
    return;
  }

  if (event.target.id === "success-close") {
    if (headerObj.MobileMenuIsOpen === false) {
      headerObj.displayHamburger();
    }
    popupObj.close(popupSuccess);
    return;
  }

  //открытие закрытие мобильного меню
  if (event.target.classList.contains("header__menu-button")) {
    headerObj.MobileMenuIsOpen = true;
    headerObj.handleMobileMenu();
    return;
  }

  if (event.target.classList.contains("header__menu-close-button")) {
    headerObj.handleMobileMenu();
    return;
  }

}

//открытие закрытие попапов
page.addEventListener("click", handlePopup);

emailRgistrationInput.addEventListener("input", function (event) {
  validObj.handleValidate(event);
});

registrationForm.addEventListener("input", function (event) {
  validObj.registrationValidate(event);
});

