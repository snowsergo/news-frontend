export default class Resume {
  constructor() {}

  // подсчет и отрисовка резюме
  count(arr) {
    let numberOfArticles = arr.length;
    let text = "";
    let keywordArr = []; //массив ключевых слов
    let keywordObj = {}; // объект с количеством повторений

    const messages = [
      "сохраненная статья", // 1, 21, 31 41 .... 121, 131,141..
      "сохраненных статьи", // (2,3,4, 22,23,24, 32,33,34..., 122,123,124)
      "сохраненных статей", //(0),(5,6,7,8,9),(10,11-20),
    ];

    if (
      (numberOfArticles % 100 > 20 || numberOfArticles % 100 < 10) &&
      (numberOfArticles % 10 == 2 ||
        numberOfArticles % 10 == 3 ||
        numberOfArticles % 10 == 4)
    ) {
      text = messages[1];
    } else if (numberOfArticles % 100 <= 20 && numberOfArticles % 100 >= 10) {
      text = messages[2];
    } else if (
      numberOfArticles % 10 == 5 ||
      numberOfArticles % 10 == 6 ||
      numberOfArticles % 10 == 7 ||
      numberOfArticles % 10 == 8 ||
      numberOfArticles % 10 == 9
    ) {
      text = messages[2];
    } else if (numberOfArticles == 0 || numberOfArticles % 10 == 0) {
      text = messages[2];
    } else {
      text = messages[0];
    }

    // количество статей
    const ariclesCount = document.querySelector(".resume__articles");
    ariclesCount.textContent = arr.length + " " + text;

    // массив ключевых слов
    for (let elem of arr) {
      keywordArr.push(elem.tag);
    }

    // объект ключевых слов и их количества
    for (let i = 0; i < keywordArr.length; ++i) {
      let a = keywordArr[i];
      if (keywordObj[a] != undefined) ++keywordObj[a];
      else keywordObj[a] = 1;
    }

    // отсортированный по убыванию массив ключевых слов
    let keysSorted = Object.keys(keywordObj).sort(function (a, b) {
      return keywordObj[b] - keywordObj[a];
    });

    const resumeTags = document.querySelector(".resume__tags");
    const resumeTagFirst = document.querySelector(".resume__tag_first");
    const resumeTagSecond = document.querySelector(".resume__tag_second");
    const resumeAnd = document.querySelector(".resume__and");
    const resumeTagOthers = document.querySelector(".resume__tag_others");
    let tagText = "";
    const tagMessages = ["другому", "другим"];

    if (keysSorted.length == 0) {
      resumeTags.classList.add("resume__tags_none");
    } else if (keysSorted.length == 1) {
      resumeTagFirst.textContent = keysSorted[0];
      resumeTagSecond.classList.add("resume__tag_none");
      resumeAnd.textContent ='';
      resumeTagOthers.classList.add("resume__tag_none");
    } else if (keysSorted.length == 2) {
      resumeTagFirst.textContent = keysSorted[0] + ", ";
      resumeTagSecond.textContent = keysSorted[1];
      resumeAnd.textContent ='';
      resumeTagOthers.classList.add("resume__tag_none");
    } else if (keysSorted.length >= 3) {
      resumeTagFirst.textContent = keysSorted[0] + ", ";
      resumeTagSecond.textContent = keysSorted[1];
      resumeAnd.textContent ='и';
      if ((keysSorted.length - 2) % 10 == 1) {
        tagText = tagMessages[0];
      } else tagText = tagMessages[1];
      resumeTagOthers.textContent = keysSorted.length - 2 + " " + tagText;
    }
  }
}
