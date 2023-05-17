const JWT = require('jsonwebtoken');
const AuthError = require('../errors/authError');

const SECRET_KEY = 'SECRET';

function generateToken(payload) {
  return JWT.sign(payload, SECRET_KEY, { expiresIn: '7d' });
}

function checkToken(token) {
  if (!token) {
    return new AuthError('Неправильный токен');
  }
  try {
    return JWT.verify(token, SECRET_KEY);
  } catch (err) {
    return { error: err.message };
  }
}

module.exports = { generateToken, checkToken };
