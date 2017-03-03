const User = require('../models/user');

function authentication( req, res, next) {
//check to see if user is logged in
// if not exit this piece of middleware
  if(!req.session.isAuthenticated) return next();
// find the user based on the user ID in the session 
  User
  .findById(req.session.userId)
  .then((user) => {
    if(!user) {
      return req.session.regenerate(()=>  res.unathorized());




    }
    req.session.userID = user.id;

    req.user = user;

    res.locals.user = user;
    res.locals.isAuthenticated = true;
    next();
  })
  .catch(next);

}


module.exports = authentication;
