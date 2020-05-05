
export default class Popup {
  constructor() {}




  /*
    renderLoading(isLoading) {
      const addUserButton = document.querySelector(".popup__user-add-button");
      const addCardButton = document.querySelector(".popup__card-add-button");
      const addAvatarButton = document.querySelector(".popup__avatar-add-button");
      if (isLoading) {
        addUserButton.textContent = "Загрузка...";
        addCardButton.textContent = "Загрузка...";
        addAvatarButton.textContent = "Загрузка...";

      } else {
        addUserButton.textContent = "Сохранить";
        addCardButton.textContent = "+";
        addAvatarButton.textContent = "Сохранить";
      }
    }
*/

    setImageLink(event) {
      const popupPic = document.querySelector(".popup__pic");
      const imageStyle = String(event.target.getAttribute("style"));
      const imageLink = imageStyle.substring(22, imageStyle.length - 1);
      popupPic.setAttribute("src", imageLink);
    }

    setInputText() {
      const name = document.querySelector(".user-info__name");
      const job = document.querySelector(".user-info__job");
      const nameInput = document.getElementById("name");
      const jobInput = document.getElementById("job");
  //Можно лучше: Лучше использовать .textContent для получения текстового содержимого. Иначе можно вытянуть html теги (исправил)
      nameInput.setAttribute("value", name.textContent);
      jobInput.setAttribute("value", job.textContent);
    }

    removeErrorMessages() {
      const errors = document.querySelectorAll(".error-message");
      errors.forEach(elem => elem.classList.remove("error-message__visible"));
    }

    open(pops) {
      pops.classList.toggle("popup_is-opened");
    }

    close(pops) {
      pops.classList.toggle("popup_is-opened");
      const popupEnterButton = document.querySelector(".popup__enter-button");
      const popupRegitrationButton = document.querySelector(".popup__registration-button");
      popupEnterButton.classList.remove("popup__button-is-active");
      popupRegitrationButton.classList.remove("popup__button-is-active");

    }

}