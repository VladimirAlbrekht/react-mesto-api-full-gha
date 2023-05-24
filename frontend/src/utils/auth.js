import { BASE_URL } from "./constants";

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
        email,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}; 

export const login = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        password,
        email,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json;
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export const logout = (token) => {
    return fetch(`${BASE_URL}/logout`,{
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json;
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}
