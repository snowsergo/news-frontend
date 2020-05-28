import { enterForm, registrationForm } from "../../main/index.js";

export default class Popup {
  constructor() {
    this.activePopup = "";
  }

  _clearContent() {
    enterForm.reset();
    registrationForm.reset();
  }

  _removeErrorMessages() {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach((elem) => elem.classList.remove("error-message__visible"));
  }

  open(pops) {
    pops.classList.add("popup_is-opened");
    if (pops.classList.contains("popup-enter")) {
      this.activePopup = "popup-enter";
    }
    if (pops.classList.contains("popup-registration")) {
      this.activePopup = "popup-registration";
    }
    if (pops.classList.contains("popup-success")) {
      this.activePopup = "popup-success";
    }
  }

  close(pops) {
    this._clearContent();
    this._removeErrorMessages();
    pops.classList.remove("popup_is-opened");
    const popupEnterButton = document.querySelector(".popup__enter-button");
    const popupRegitrationButton = document.querySelector(
      ".popup__registration-button"
    );
    popupEnterButton.classList.remove("popup__button-is-active");
    popupRegitrationButton.classList.remove("popup__button-is-active");
    this.activePopup = "";
  }
}
