import { BASE_URL } from "./constants";

// --- КЛАСС ДЛЯ ОТПРАВКИ ЗАПРОСОВ НА СЕРВЕР ---

class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._baseUrl = baseUrl;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._token = headers['authorization'];
  }


  //метод получения информации о пользователе с сервера
  getUserData() {
    return fetch(this._userUrl, {
        headers: {
          authorization: this._token,
        },
        credentials: 'include',
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  //метод сохранения отредактированных данных пользователя на сервере
  saveUserChanges({
    name,
    about
  }) {
    return fetch(this._userUrl, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          name: name,
          about: about,
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  //метод обновления аватара пользователя
  changedAvatar(src) {
    return fetch(`${this._userUrl}/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          avatar: src,
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  //метод получения карточек с сервера
  getInitialCards() {
    return fetch(this._cardsUrl, {
      headers: {
        authorization: this._token,
      },
      credentials: 'include',
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  //метод добавления новой карточки на сервер
  postNewCard({
    name,
    link
  }) {
    return fetch(this._cardsUrl, {
        method: 'POST',
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          name: name,
          link: link,
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  //метод удаления карточки пользователя с сервера
  deleteCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
        },
        credentials: 'include',
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  //метод постановки/удаления лайка на карточке
  changeLikeCardStatus(cardId, isNotLiked){
      return fetch(`${this._cardsUrl}/${cardId}/likes`, {
        method: isNotLiked ? "PUT" : "DELETE",
        headers: {
          authorization: this._token,
        },
        credentials: 'include',
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}


//создаем экземпляр класса Api
const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

export default api;