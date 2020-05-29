export default class MainApi {
  constructor() {}

  // устанавливаем пользоватея при входе на страницу с сохраненными статьями
  setUser() {
    if (localStorage.getItem("isLoggedin") === "true") {
      const logoutButton = document.querySelector(
        ".header__logout-user-container"
      );
      const user = document.querySelector(".resume__user");
      logoutButton.textContent = localStorage.getItem("userName");
      user.textContent = localStorage.getItem("userName");
    } else {
      document.location.href = ".././";
    }
  }

  //регистрирует нового пользователя;
  signup(server, email, password, name) {
    return fetch(`${server}/signup`, {
      method: "POST",
      // mode:'no-cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    }).catch((err) => {
      console.log("Ошибка отправки данных пользователя", err);
    });
  }

  //вход пользователя
  signin(server, email, password) {
    return fetch(`${server}/signin`, {
      method: "POST",
      credentials: "include",
      // mode:'no-cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).catch((err) => {
      console.log("ошибка в mainapi.signin", err);
    });
  }

  // запрос данных пользователя
  getUserData(server) {
    return fetch(`${server}/users/me`, {
      method: "GET",
      credentials: "include",
      //mode:'no-cors',
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log("Ошибочка получения данных пользователя", err);
      });
  }

  //забирает все статьи;
  getArticles(server) {
    return fetch(`${server}/articles`, {
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status == 404) {
        const empty = { data: [] };
        return empty; // если нет карточек возвращаем пустой объект
      }
      return Promise.reject(
        `Ошибка загрузки первоначальных карточек: ${res.status}`
      );
    });
  }

  //создаёт статью;
  createArticle(server, obj) {
    return fetch(`${server}/articles`, {
      method: "POST",
      credentials: "include",
      //mode:'no-cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: obj.keyword,
        title: obj.title,
        text: obj.text,
        date: obj.date,
        source: obj.source,
        link: obj.link,
        image: obj.image,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res;
        }
      })
      .catch((err) => {
        console.log("Ошибка отправки карточки", err);
      });
  }

  //удаляет статью.
  removeArticle(server, articleId) {
    return fetch(`${server}/articles/${articleId}`, {
      credentials: "include",
      method: "DELETE",
    }).catch((err) => {
      console.log("Ошибка удаления карточки", err);
    });
  }
}
