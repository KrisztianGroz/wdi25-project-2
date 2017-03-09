const User = require('../models/user');


function showProfile(req, res, next ) {

  User
    .findById(req.user.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return res.render('profil/show', { user });
    })
    .catch(next);
}

module.exports = {
  profs: showProfile
};
