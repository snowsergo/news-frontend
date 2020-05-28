export default class Card {
  constructor() {}
  /*
  getCardId(obj) {
    return obj._id;
  }

  removeLike(element) {
    element.classList.remove("place-card__like-icon_liked");
    element.nextElementSibling.textContent =
      Number(element.nextElementSibling.textContent) - 1;
  }

  setLike(element) {
    element.classList.add("place-card__like-icon_liked");
    element.nextElementSibling.textContent =
      Number(element.nextElementSibling.textContent) + 1;
  }

  remove(element) {
    placesList.removeChild(element.closest(".place-card"));
  }
*/

  // обработчик форматата даты
  handleDate(str) {
    const year = str.slice(0, 4);
    let day = str.slice(8, 10);
    let month = str.slice(5, 7);
    const months = [
      "декабря",
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
    ];
    if (month[0] === "0") {
      month = month[1];
    }
    if (month === "12") {
      month = "0";
    }
    month = months[+month];
    if (day[0] === "0") {
      day = day[1];
    }
    const normalDate = `${day} ${month}, ${year}`;
    return normalDate;
  }



  create(obj) {
   // console.log("ТЭГ: " + obj.tag);
    const card = {
      title: obj.title,
      description: obj.description,
      publishedAt: this.handleDate(obj.publishedAt),
      urlToImage: obj.urlToImage,
      source: obj.source,
      tag:obj.tag,
      link:obj.link
    };
    return card;
  }

  remove(element) {
    const cardlist = document.querySelector(".cardlist");
    cardlist.removeChild(element.closest(".card"));
  }


  createSaved(obj){
    const card = {
      title: obj.title,
      description: obj.description,
      publishedAt: obj.publishedAt,
      urlToImage: obj.urlToImage,
      source: obj.source,
      tag:obj.tag,
      link:obj.link,
      id:obj.id
  }
  return card;
}


  //получем данные карточки для записи в БД main.api
read(element){
  // console.log(element.closest(".card"));
  const parent = element.closest(".card");
  const card ={}

  card.keyword = parent.getAttribute("id").slice(4,);
  card.title = parent.querySelector(".card__title").textContent;
  card.text = parent.querySelector(".card__text").textContent;
  card.date = parent.querySelector(".card__date").textContent;
  card.source = parent.querySelector(".card__source").textContent;
  card.link = parent.querySelector(".card__link").getAttribute("href");
  card.image = parent.querySelector(".card__image").getAttribute("src");

console.log(card);
  return card
}

}
