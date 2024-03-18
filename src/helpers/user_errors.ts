// USER_NOT_FOUND = 'User not found',
// USER_ALREADY_EXISTS = 'User already exists',
// INVALID_PASSWORD = 'Invalid password',
// INVALID_EMAIL = 'Invalid email',
// INVALID_NAME = 'Invalid name',
// INVALID_ID = 'Invalid id',

export class UserNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserNotFoundError';
  }
}

export class IncorrectPasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'IncorrectPasswordError';
  }
}
