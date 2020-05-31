export default class NewsApi {
  constructor() {}

  // возвращает список новостей на основе запроса Your API key is: fa485188ab5044baaf48fed1bd8263b1
  getNews(keyword, weekago, today) {
    console.log("отправили запрос на NEWS.API");
    // https://praktikum.tk/news/v2/everything    http://cors-anywhere.herokuapp.com/
    return fetch(`https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything?q=${keyword}&from=${weekago}&to=${today}&language=ru&sortBy=popularity&pageSize=10&apiKey=fa485188ab5044baaf48fed1bd8263b1`,{
   //   mode: 'no-cors',
    })
    .then(res => res.json())
    .catch((err) => {console.log("Ошибка в обращенни к сервису NEWS.API", err);});
  }
}
