const User = require('../models/user');

function loginNew(req, res) {
  res.render('login/new');
}

function loginCreate(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        req.flash('danger', 'Unknown email/password combination');
        return res.redirect('/login');
      }

      req.session.userId = user.id;
      req.session.isAuthenticated = true;

      req.user = user;

      req.flash('success', `Welcome back, ${user.username}!`);
      res.redirect('/');
    })
    .catch(next);
}

function loginDelete(req, res) {
  req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: loginNew,
  create: loginCreate,
  delete: loginDelete
};
