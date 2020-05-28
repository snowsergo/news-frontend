import "./index.css";
import MainApi from "../js/api/mainapi.js";
import Header from "../js/components/header.js";
import Resume from "../js/components/resume.js";
import CardList from "../js/components/cardlist.js";
import Card from "../js/components/card.js";

import { server } from "../js/constants/server-info";

const mainApi = new MainApi();
const headerObj = new Header();
const resumeObj = new Resume();
const cardlistObj = new CardList();
const cardObj = new Card();
const page = document.querySelector(".page");
const logoutButton = document.querySelector(".header__logout-button");

// установка пользователя
mainApi.setUser();
headerObj.isLoggedin = localStorage.getItem("isLoggedin");
headerObj.userName = localStorage.getItem("userName");

// загрузка первоначальных карточек
mainApi.getArticles(server)
.then((res) => {
  const results = document.querySelector(".results");
  if (res.data.length == 0) {
    const empty = []; // делаем пустое резюме
    resumeObj.count(empty);
    results.classList.remove("results_is-opened");
  } else {
     // составляем резюме
    results.classList.add("results_is-opened");
    for (let obj of cardlistObj.getRenderArraySaved(res.data)) {
      cardlistObj.renderSaved(obj); // отрисовываем секцию с карточками
    }
    resumeObj.count(cardlistObj.articlesSaved);
  }
});

// показываем тултипы
function handleTooltip(event) {
  if (event.target.classList.contains("card__delete-icon")) {
    const tooltip = event.target.previousElementSibling;
    tooltip.classList.toggle("card__tooltip_is-opened");
  }
}

function removeCard(event) {
  if (event.target.classList.contains("card__delete-icon")) {
    const cardId = event.target.getAttribute("id");
    if (window.confirm("Are you serious?")) {
      mainApi.removeArticle(server, cardId).then((res) => {
        if (res.ok) {
          cardObj.remove(event.target); // удаляем карточку из плейлиста

          // уаляем карточку из массива карточек
          let cardToRemove = cardlistObj.articlesSaved.find((item) => item.id == cardId);
          cardlistObj.articlesSaved.splice(cardlistObj.articlesSaved.indexOf(cardToRemove, 0),1);

          // отрисовываем резюме
          resumeObj.count(cardlistObj.articlesSaved); // составляем резюме

          // если массив пустой скрываем секцию карточек
          if(cardlistObj.articlesSaved.length == 0){
            const results = document.querySelector(".results");
            results.classList.remove("results_is-opened");
          }
        }
      });
    }
  }
}

// открытие закртие мобильного меню
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

// разлогинивание
function logout() {
  headerObj.isLoggedin = false;
  headerObj.userName = "";
  localStorage.setItem('userName', '');
  localStorage.setItem('isLoggedin', false);
  document.location.href = ".././";
}


// открытие закрытие меню
page.addEventListener("click", handleMenu);

// показываем тултипы
page.addEventListener("mouseover", handleTooltip);
page.addEventListener("mouseout", handleTooltip);

// удаление карточек
page.addEventListener("click", removeCard);

//разлогинивание
logoutButton.addEventListener("click", logout);