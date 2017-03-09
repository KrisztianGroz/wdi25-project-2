const Session = require('../models/session');

function indexRoute(req, res, next) {
  Session
    .find(req.query)
    .populate('createdBy')
    .exec()
    .then((sessions) => res.render('sessions/index', { sessions }))
    .catch(next);
}

function newRoute(req, res) {
  return res.render('sessions/new');
}

function createRoute(req, res, next) {

  req.body.createdBy = req.user;
  // body parser use in here

  Session
    .create(req.body)
    .then(() => res.redirect('/sessions'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/sessions/new`, err.toString());
      next(err);
    });
}

function showRoute(req, res, next) {
  Session
    .findById(req.params.id)
    .populate('createdBy ')
    .exec()
    .then((session) => {
      if(!session) return res.notFound();
      return res.render('sessions/show', { session });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Session
    .findById(req.params.id)
    .exec()
    .then((session) => {
      return res.render('sessions/edit', { session });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Session
    .findById(req.params.id)
    .exec()
    .then((session) => {
      if(!session) return res.notFound();

      for(const field in req.body) {
        session[field] = req.body[field];
      }

      return session.save();
    })
    .then(() => res.redirect(`/sessions/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/sessions/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  Session
    .findById(req.params.id)
    .exec()
    .then((session) => {
      if(!session) return res.notFound();
      return session.remove();
    })
    .then(() => res.redirect('/sessions'))
    .catch(next);
}

function createCommentRoute(req, res, next) {

  req.body.createdBy = req.user;
  Session
    .findById(req.params.id)
    .exec()
    .then((session) => {
      if(!session) return res.notFound();

      session.comments.push(req.body); // create an embedded record
      return session.save();
    })
    .then((session) => res.redirect(`/sessions/${session.id}`))
    .catch(next);

}
function deleteCommentRoute(req, res, next) {
  Session
    .findById(req.params.id)
    .exec()
    .then((session) => {
      if(!session) return res.notFound();

      const comment = session.comments.id(req.params.commentId);
      comment.remove();

      return session.save();

    })
    .then((session) => res.redirect(`/sessions/${session.id}`))
    .catch(next);

}
module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
