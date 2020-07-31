const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Check for an authorization header in the incoming request
  const authHeader = req.get('Authorization');
  // If there is no auth header than set flag to false and let it pass through
  if (!authHeader) {
    req.isAuth = false;
    return next()
  }
  // If there is a header than check for a token
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return next()
  }
  // If token exists check its valid
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'ojwafwe5f1weeD4F4fwfwjkjK5SHhwqFlfj6hewjf1EFDSF5SDFjn6Suvref564f')
  } catch (err) {
    req.isAuth = false;
    return next()
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next()
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next(); 
}