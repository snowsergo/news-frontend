export default class Header {
  constructor() {
    this.Page = false;
    this.MobileMenuIsOpen = false;  //статус мобильного меню
    this.isLoggedin = false;
    this.userName = "";
  }

  handleUser() {
    const loginButton = document.querySelector(".header__login-button");
    const logoutButton = document.querySelector(".header__logout-button");
    const articlesPage = document.querySelector(".header__page_inactive");
    const user = document.querySelector(".header__logout-user-container");
    user.textContent = this.userName;
    loginButton.classList.toggle("button_is-hidden");
    logoutButton.classList.toggle("button_is-hidden");
    articlesPage.classList.toggle("header__page_is-opened");
  }

  initialRender() {
    if (localStorage.getItem("isLoggedin") === 'true') {
      // делаем страницу залогиненого пользователя
      this.isLoggedin = true;
      this.userName = localStorage.getItem("userName");
      this.handleUser();
    } else {
      return;
    }
  }

  // исчезновение иконки моильного меню
  hideHamburger() {
    const headerMenuButton = document.querySelector(".header__menu-button");
    headerMenuButton.classList.add("button_is-hidden");
  }

  //появление иконки мобильного меню
  displayHamburger() {
    if(!this.MobileMenuIsOpen){
      const headerMenuButton = document.querySelector(".header__menu-button");
      headerMenuButton.classList.remove("button_is-hidden");
    }
  }

  // активация деактивация мобильного меню
  handleMobileMenu() {
    const headerMenu = document.querySelector(".header__menu");
    headerMenu.classList.toggle("header__menu_mobile");
    const headerMenuContent = document.querySelector(".header__menu-content");
    headerMenuContent.classList.toggle("header__menu-content_mobile");
    const headerMobileHeader = document.querySelector(".header__mobile-header");
    headerMobileHeader.classList.toggle("header__mobile-header_is-opened");
    const headerNav = document.querySelector(".header__nav");
    headerNav.classList.toggle("header__nav_is-opened");
    const headerButtonContainer = document.querySelector(
      ".header__button-container"
    );
    headerButtonContainer.classList.toggle(
      "header__button-container_is-opened"
    );

    const headerMenuButton = document.querySelector(".header__menu-button");
    headerMenuButton.classList.toggle("button_is-hidden");
  }

}
