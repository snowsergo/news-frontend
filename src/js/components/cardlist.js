export default class CardList {
  constructor() {
    this.count = 0;
    this.articlesLeft = [];
    this.articlesSaved = [];
  }

  renderAll(obj, page) {
    const cardList = document.querySelector(".cardlist");

    const newImage = document.createElement("img");
    const newTooltip = document.createElement("p");
    const newButton = document.createElement("button");
    const newDate = document.createElement("p");
    const newTitle = document.createElement("h3");
    const newText = document.createElement("p");
    const newSource = document.createElement("p");
    let newTag = "";

    if (page === "secondary") {
      newTag = document.createElement("p");
      newTag.classList.add("card__tag");
      newTag.textContent = obj.tag;
      newTooltip.classList.add("card__tooltip_delete");
      newButton.classList.add("card__delete-icon");
      newTooltip.textContent = "Убрать из сохраненных";
      newButton.setAttribute("id", obj.id);
    } else if (page === "main") {
      newTooltip.classList.add("card__tooltip_save");
      newButton.classList.add("card__save-icon");
      newTooltip.textContent = "Войдите, чтобы сохранять статьи";
    }

    newImage.classList.add("card__image");
    newTooltip.classList.add("card__tooltip");
    newDate.classList.add("card__date");
    newTitle.classList.add("card__title");
    newText.classList.add("card__text");
    newSource.classList.add("card__source");
    newImage.setAttribute("src", obj.urlToImage);
    newButton.setAttribute("type", "button");

    newDate.textContent = obj.publishedAt;
    newTitle.textContent = obj.title;
    newText.textContent = obj.description;
    newSource.textContent = obj.source;

    // сохраненная карточка
    cardList.innerHTML += `
<div class="card" id="tag-${obj.tag}">
<div class="card__label-container">
${page === "secondary" ? newTag.outerHTML : ""}
${newTooltip.outerHTML}
${newButton.outerHTML}
</div>
<a target="_blank" class="card__link" href="${obj.link}">
<div class="card__image-container">
${newImage.outerHTML}
</div>
<div class="card__info-container">
${newDate.outerHTML}
${newTitle.outerHTML}
${newText.outerHTML}
</div>
${newSource.outerHTML}
</a>
</div>`;
  }

  // подготовка массива карточек с news.api
  getRenderArray(arr, tag) {
    this.articlesLeft = [];
    for (let obj of arr) {
      this.articlesLeft.push({
        title: obj.title,
        description: obj.description,
        publishedAt: obj.publishedAt,
        // на случай отсутствия картинки вставляем свою
        urlToImage:
          obj.urlToImage == null
            ? "https://www.firestock.ru/wp-content/uploads/2015/01/dollarphotoclub_65597173-700x516.jpg"
            : obj.urlToImage,
        source: obj.source.name,
        tag: tag,
        link: obj.url,
      });
    }
    return this.articlesLeft;
  }

  // подгатавливаем массив карточек из базы данных
  getRenderArraySaved(arr) {
    for (let obj of arr) {
      this.articlesSaved.unshift({
        title: obj.title,
        description: obj.text,
        publishedAt: obj.date,
        urlToImage: obj.image,
        source: obj.source,
        tag: obj.keyword,
        link: obj.link,
        id: obj._id,
      });
    }
    return this.articlesSaved;
  }

  // очистка кардлиста
  clear() {
    const cardList = document.querySelector(".cardlist");
    cardList.innerHTML = "";
  }
}
