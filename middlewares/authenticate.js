// для перевірки токена створюємо мідлвар
// 1. Дістати із заголовків запиту заголовок authorization.
// 2. Розділити його на два слова.
// 3. Перевірити чи дорівнює перше слово 'Bearer'.
// 3.1 Якщо ні відправити відповідь 401.
// 4 Перевірити чи валідний токен. (метод verify, повертає помилку або payload)
// 4.1 Якщо ні відправити відповідь 401.
// 5 Перевірити чи є в базі користувач з таким email.
// 5.1 Якщо немає відправити відповідь 401.
// 6 Додати в обєкт request знайденого користувача.
// req.user = user;
// 7. Передати обробку далі.

const { createError } = require('../helpers');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticate = async (req, res, next) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    next(createError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw createError(401);
    }
    req.user = user;
    next();
  } catch (error) {
    error.status = 401;
    error.message = 'Not authorized';
    next(error);
  }
};

module.exports = authenticate;
