# NEWS
Адаптивня верска сайта по взаимодействю с NEWS.API
Обеспечивает регистрации и авторизацию пользователя.
Поиск сохранение и удаление статьей.

## Текущая версия
1.0.1

## Ссылка на gh pages
[https://snowsergo.github.io/news-frontend](https://snowsergo.github.io/news-frontend)


## Просмотр вмобильного меню:
нажимаем на кнопку мобильного меню:
на header__menu  вешаем класс header__menu_mobile  появляется затемненный фон
на header__menu-content вешаем класс header__menu-content_mobile появляется черное меню
на header__mobile-header вешаем класс header__mobile-header_is-opened  отображается шапка моюильного меню
на header__nav вешаем класс header__nav_is-opened  появляется лист навигации
на header__button-container вешаем класс header__button-container_is-opened появляется кнопка выхода мобильного меню.
на header__menu-button(гамбургер) вешаем класс button_is-hidden  прячется гамбургер

функция закрытия меню будет снимать все эти классы


## Просмотр всплывающих меню и открытие попапов
 необходимо в верстке следующих элемнтов добавить класс popup_is-opened:
 - попап регистрации
 - попап входа
 - попап успешного входа

## Установка проекта

Скопируйте проект на компьютер:

```
git clone https://github.com/snowsergo/news-frontend.git
```

Установите зависимости проекта:

```
npm i
```
