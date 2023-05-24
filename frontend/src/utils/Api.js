class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = options.baseUrl;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._likesUrl = `${this._baseUrl}/cards/likes`;
    this._token = options.headers["authorization"];
    this._headers = options.headers;
  }

  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(this._cardsUrl, {
      headers: this._headers,
    }).then((res) => this._getResponse(res));
  }

  getUserData() {
    return fetch(this._userUrl, {
      headers: this._headers,
    }).then((res) => this._getResponse(res));
  }

  postNewCard(data) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._getResponse(res));
  }

  changedAvatar(src) {
    return fetch(`${this._userUrl}/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: src,
      }),
    }).then((res) => this._getResponse(res));
  }

  saveUserChanges(data) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._getResponse(res));
  }

  deleteCardServer(idCard) {
    return fetch(`${this._cardsUrl}/${idCard}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponse(res));
  }

  changeLikeCardStatus(cardId, isNotLiked) {
    return fetch(`${this._likesUrl}/${cardId}`, {
      method: isNotLiked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponse(res));
  }
}

//Добавляем экземпляр класса  Api c данными пользователя
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "4ad205f5-51c6-4198-8b11-26d3d2a06600",
    "Content-Type": "application/json",
  },
});

export default api;
