export default class Header {
  constructor() {
    this.MobileMenuIsOpen = false;
    this.isLoggedin = false;
    this.userName ='';
  }

  render(){}
  
  hideHamburger(){
    const headerMenuButton = document.querySelector(".header__menu-button");
    headerMenuButton.classList.add("button_is-hidden");
  }

  displayHamburger(){
    const headerMenuButton = document.querySelector(".header__menu-button");
    headerMenuButton.classList.remove("button_is-hidden");
  }

  handleMobileMenu(){
    const headerMenu = document.querySelector(".header__menu");
    headerMenu.classList.toggle("header__menu_mobile");

    const headerMenuContent = document.querySelector(".header__menu-content");
    headerMenuContent.classList.toggle("header__menu-content_mobile");

    const headerMobileHeader = document.querySelector(".header__mobile-header");
    headerMobileHeader.classList.toggle("header__mobile-header_is-opened");

    const headerNav = document.querySelector(".header__nav");
    headerNav.classList.toggle("header__nav_is-opened");

    const headerButtonContainer = document.querySelector(".header__button-container");
    headerButtonContainer.classList.toggle("header__button-container_is-opened");

    const headerMenuButton = document.querySelector(".header__menu-button");
    headerMenuButton.classList.toggle("button_is-hidden");
  }

}