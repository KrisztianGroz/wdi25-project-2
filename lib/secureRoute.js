function secureRoute(req, res, next) {

  if(!req.session.isAuthenticated || !req.session.userId) {
    return req.session.regenerate(() =>{
      req.flash('alert', 'you must be logged in' );
      return res.redirect('/login');

    });
  }
  next();
}

module.exports = secureRoute;
