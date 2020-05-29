import "./index.css";
import MainApi from "../js/api/mainapi.js";
import NewsApi from "../js/api/newsapi.js";
import Header from "../js/components/header.js";
import Popup from "../js/components/popup.js";
import Validation from "../js/utils/validation.js";
import Preloader from "../js/components/preloader.js";
import CardList from "../js/components/cardlist.js";
import Card from "../js/components/card.js";
import { server } from "../js/constants/server-info.js";

const page = document.querySelector(".page");
const popupEnter = document.querySelector(".popup-enter");
const popupRegistration = document.querySelector(".popup-registration");
const popupSuccess = document.querySelector(".popup-success");
const logoutButton = document.querySelector(".header__logout-button");
const resultButton = document.querySelector(".results__button");

const mainApi = new MainApi();
const newsApi = new NewsApi();
const popupObj = new Popup();
const headerObj = new Header();
const validObj = new Validation();
const preloaderObj = new Preloader();
const card = new Card();
const cardlistObj = new CardList();

export const enterForm = document.forms.enter;
export const registrationForm = document.forms.registration;
const searchForm = document.forms.search;

export const emailRgistrationInput = document.querySelector(
  "#emailregistration"
);
export const passwordRgistrationInput = document.querySelector(
  "#passwordregistration"
);
export const nameRgistrationInput = document.querySelector("#nameregistration");
export const emailEnterInput = document.querySelector("#email-enter");
export const passwordEnterInput = document.querySelector("#password-enter");

//Проверка залогиненности пользователя
headerObj.initialRender();
if (localStorage.getItem("isLoggedin") === "true") {
  logoutButton.addEventListener("click", logout);
}

//headerObj.page="main";

// регистрация нового пользователя
function signup(event) {
  event.preventDefault();
  mainApi
    .signup(
      server,
      registrationForm.elements.emailregistration.value,
      registrationForm.elements.passwordregistration.value,
      registrationForm.elements.name.value
    )
    .then((res) => {
      if (res.ok) {
        // popupObj.close(popupRegistration);
        closeRegistrationForm();
        popupObj.open(popupSuccess);
        document.addEventListener("keydown", pressEscape);
      } else return res.json();
    })
    .then((data) => {
      if (data) {
        validObj.registrationMessage(data.message); // выводим ошибку сервера
      }
    })
    .catch((err) => {
      console.log("Ошибка создания пользователя", err);
    });
}

//вход пользователя
function signin(event) {
  event.preventDefault();
  mainApi
    .signin(
      server,
      enterForm.elements.emailenter.value,
      enterForm.elements.passwordenter.value
    )
    .then((res) => {
      if (!res.ok) {
        return res.json();
      } else {
        mainApi.getUserData(server).then((data) => {
          headerObj.isLoggedin = true;
          headerObj.userName = data.data.name;
          localStorage.setItem("userName", data.data.name);
          localStorage.setItem("isLoggedin", true);
          headerObj.handleUser();
          closeEnterForm();
          headerObj.displayHamburger();
          logoutButton.addEventListener("click", logout);
        });
        return;
      }
    })
    .then((data) => {
      if (data) {
        validObj.enterMessage(data.message); // выводим сообщение об ошибки в форме
      }
    })
    .catch((err) => {
      console.log("Ошибка входа пользователя", err);
    });
}

// нажимаем на кнопку выхода пользователя
function logout() {
  headerObj.isLoggedin = false;
  headerObj.userName = "";
  localStorage.setItem("userName", "");
  localStorage.setItem("isLoggedin", false);
  headerObj.handleUser();
  logoutButton.removeEventListener("click", logout);
}

// запрос новостей  from=2020-05-08
function getNews(event) {
  page.removeEventListener("mouseover", handleTooltip);
  page.removeEventListener("mouseout", handleTooltip);
  page.removeEventListener("click", saveCard);

  event.preventDefault();
  preloaderObj.renderLoading(true);
  preloaderObj.nothingFound(false);
  preloaderObj.showResults(false);

  //преобразование дат
  const now = new Date();
  const to = now.toISOString().slice(0, 10);
  const weekago = new Date();
  weekago.setDate(weekago.getDate() - 7);
  const from = weekago.toISOString().slice(0, 10);

  newsApi
    .getNews(searchForm.elements.theme.value, from, to)
    .then((res) => {
      preloaderObj.renderLoading(false);
      if (res.articles.length === 0) {
        preloaderObj.nothingFound(true);
      } else {
        preloaderObj.nothingFound(false);
        cardlistObj.clear();
        preloaderObj.showResults(true);
        return cardlistObj.getRenderArray(
          // подготовка массива для отрисовки
          res.articles,
          searchForm.elements.theme.value
        );
      }
    })
    .then((result) => {
      if (result.length <= 3) {
        for (let i = 0; i < result.length; ) {
          cardlistObj.render(card.create(result[i]));
          result.shift(); // удаляем отрисованный элемен из массива
        }
      } else {
        for (let i = 0; i < 3; i++) {
          cardlistObj.renderAll(card.create(result[0]), headerObj.page);
          result.shift(); // удаляем отрисованный элемен из массива
        }
        preloaderObj.renderButton(true); //отображаем кнопку
        resultButton.addEventListener("click", displayCards); //вешаем слушатель на кнопку
      }
      page.addEventListener("mouseover", handleTooltip);
      page.addEventListener("mouseout", handleTooltip);
      page.addEventListener("click", saveCard);
    })
    .catch((err) => {
      preloaderObj.nothingFound(true);
      console.log("Ошибка загрузки новостей", err);
    });
}

// отрисовка по 3 карточки пока не закончатся
function displayCards() {
  for (let i = 0; i < 3; i++) {
    cardlistObj.renderAll(card.create(cardlistObj.articlesLeft[0]),headerObj.page);
    cardlistObj.articlesLeft.shift(); // удаляем отрисованный элемен из массива
    if (cardlistObj.articlesLeft == 0) {
      preloaderObj.renderButton(false);
      resultButton.removeEventListener("click", displayCards); //удаляем слушатель с кнопка
      break;
    }
  }
}

//открытие закрытие меню
function handleMenu(event) {
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

// валидация форм
function formValidation(event) {
  validObj.formValidate(event); // валидация формы
  validObj.handleValidate(event); //  валидация input'ов
  validObj.messageRemove();
}

function openEnterForm() {
  popupObj.open(popupEnter);
  enterForm.addEventListener("input", formValidation);
  enterForm.addEventListener("submit", signin);
  document.addEventListener("keydown", pressEscape);
}

function closeEnterForm() {
  popupObj.close(popupEnter);
  enterForm.removeEventListener("input", formValidation);
  enterForm.removeEventListener("submit", signin);
  document.removeEventListener("keydown", pressEscape);
}

function openRegistrationForm() {
  popupObj.open(popupRegistration);
  registrationForm.addEventListener("input", formValidation);
  registrationForm.addEventListener("submit", signup);
  document.addEventListener("keydown", pressEscape);
}

function closeRegistrationForm() {
  popupObj.close(popupRegistration);
  registrationForm.removeEventListener("input", formValidation);
  registrationForm.removeEventListener("submit", signup);
  document.removeEventListener("keydown", pressEscape);
}

//открытие закрытие попапов
function handlePopup(event) {
  if (event.target.classList.contains("header__login-button")) {
    if (headerObj.MobileMenuIsOpen === true) {
      headerObj.handleMobileMenu();
      headerObj.hideHamburger();
      headerObj.MobileMenuIsOpen = false;
    }
    openEnterForm();
    return;
  }

  if (event.target.classList.contains("popup__link_enter")) {
    closeRegistrationForm();
    openEnterForm();
    return;
  }

  if (event.target.classList.contains("popup__link_success")) {
    popupObj.close(popupSuccess);
    openEnterForm();
    return;
  }

  if (event.target.classList.contains("popup__link_registration")) {
    closeEnterForm();
    openRegistrationForm();
    return;
  }
  if (
    event.target.id === "enter-close" ||
    (event.target.classList.contains("popup-enter") &&
      !event.target.classList.contains("popup__content"))
  ) {
    closeEnterForm();
    headerObj.displayHamburger();
    return;
  }

  if (
    event.target.id === "registration-close" ||
    (event.target.classList.contains("popup-registration") &&
      !event.target.classList.contains("popup__content"))
  ) {
    closeRegistrationForm();
    headerObj.displayHamburger();
    return;
  }

  if (
    event.target.id === "success-close" ||
    (event.target.classList.contains("popup-success") &&
      !event.target.classList.contains("popup__content"))
  ) {
    popupObj.close(popupSuccess);
    document.removeEventListener("keydown", pressEscape);
    headerObj.displayHamburger();
    return;
  }
}

// отображение и скрытие тултипа
function handleTooltip(event) {
  if (
    event.target.classList.contains("card__save-icon") &&
    !headerObj.isLoggedin
  ) {
    const tooltip = event.target.previousElementSibling;
    tooltip.classList.toggle("card__tooltip_is-opened");
  }
}

// сохранение карточки
function saveCard(event) {
  if (
    event.target.classList.contains("card__save-icon") &&
    headerObj.isLoggedin
  ) {
    const obj = card.read(event.target); //получаем данные карточки которую хотим сохранитть
    mainApi.createArticle(server, obj).then((res) => {
      if (res.ok) {
        // меняем флажок на карточке
        event.target.classList.add("card__save-icon_saved");
        event.target.setAttribute("disabled", true);
      }
    });
  }
}

// нажате на Esc для закрытия попапа
function pressEscape(e) {
  if (e.keyCode === 27) {
    if (popupObj.activePopup === "popup-enter") {
      closeEnterForm();
      headerObj.displayHamburger();
    }
    if (popupObj.activePopup === "popup-registration") {
      closeRegistrationForm();
      headerObj.displayHamburger();
    }
    if (popupObj.activePopup === "popup-success") {
      popupObj.close(popupSuccess);
      headerObj.displayHamburger();
    }
  }
}

//открытие закрытие меню
page.addEventListener("click", handleMenu);

//открытие закрытие попапов
page.addEventListener("click", handlePopup);

//запрос новостей
searchForm.addEventListener("submit", getNews);
