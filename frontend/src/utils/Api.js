class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._baseUrl = baseUrl;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._likesUrl = `${this._baseUrl}/cards/likes`;
    this._headers = headers;
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
      credentials: 'include',
    }).then((res) => this._getResponse(res));
  }

  getUserData() {
    return fetch(this._userUrl, {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._getResponse(res));
  }

  postNewCard(data) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
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
      credentials: 'include',
      body: JSON.stringify({
        avatar: src,
      }),
    }).then((res) => this._getResponse(res));
  }

  saveUserChanges(data) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
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
      credentials: 'include',
    }).then((res) => this._getResponse(res));
  }

  changeLikeCardStatus(cardId, isNotLiked) {
    return fetch(`${this._likesUrl}/${cardId}`, {
      method: isNotLiked ? "PUT" : "DELETE",
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._getResponse(res));
  }
}

//Добавляем экземпляр класса  Api c данными пользователя
const api = new Api({
  baseUrl: "https://api.mesto-15.nomoredomains.monster",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
