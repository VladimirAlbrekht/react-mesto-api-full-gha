const { ERROR_CODE_USER_EXIST } = require('./errorsStatus');

class UserExistError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_USER_EXIST;
  }
}

module.exports = UserExistError;
