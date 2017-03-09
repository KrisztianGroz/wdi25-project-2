const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const search = require('../controllers/search');
const profile = require('../controllers/profil');
const login = require('../controllers/login');
const secureRoute = require('../lib/secureRoute');

router.get('/', (req, res) => res.render('statics/index'));

router.route('/sessions')
  .get(sessions.index)
  .post(secureRoute, sessions.create);

router.route('/sessions/new')
  .get(secureRoute, sessions.new);

router.route('/sessions/:id')
  .get(sessions.show)
  .put(secureRoute, sessions.update)
  .delete(secureRoute, sessions.delete);

router.route('/sessions/:id/edit')
  .get(secureRoute, sessions.edit);

router.route('/sessions/:id/comments')
  .post(secureRoute, sessions.createComment);

router.route('/sessions/:id/comments/:commentId')
  .delete(secureRoute, sessions.deleteComment);

router.route('/login')
  .get(login.new)
  .post(login.create);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/search')
    .get(search.main);

router.route('/profil')
    .get(profile.profs);



router.all('*', (req, res) => res.notFound());

module.exports = router; // ?
