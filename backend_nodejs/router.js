'use strict';

/**
 * Register controllers here.
 */
module.exports = function(app) {
  app.apiRequiredLogin = async function(req, res, next) {
    UserAuthManager.verifyToken(req.headers.jwt, (err, user) => {
      if (!err) {
        req.user = user;
        next();

      } else {
        res.status(400).send({ error: { code: AppConstants.ErrorEnum.NOT_AUTHENTICATED.id, message: 'auth failed' }});
      }
    });
  };

  app.apiRequiredFamily = async function(req, res, next) {
    if (!req.user.family_id) {
      res.status(400).send({ error: { code: AppConstants.ErrorEnum.NOT_AUTHORIZED.id,
                                      message: 'require family' }});
    } else {
      next();
    }
  };

  app.apiRequiredParent = async function(req, res, next) {
    if (0 === (AppConstants.RoleEnum.PARENT.id & req.user.role_id)) {
      res.status(400).send({ error: { code: AppConstants.ErrorEnum.NOT_AUTHORIZED.id,
                                      message: 'require parent' }});
    } else {
      next();
    }
  };

  app.apiRequiredAdmin = async function(req, res, next) {
    if (0 === (AppConstants.RoleEnum.ADMIN.id & req.user.role_id)) {
      res.status(400).send({ error: { code: AppConstants.ErrorEnum.NOT_AUTHORIZED.id,
                                      message: 'require admin' }});
    } else {
      next();
    }
  };

  app.series = function() {
    var callbacks = Array.prototype.slice.call(arguments);
    var args = {};

    function next() {
      var callback = callbacks.shift();
      if (callback) {
        callback(args, function() {
          args = arguments;
          next();
        });
      }
    }
    next();
  };

  require('./controller/home-controller')(app);
  require('./controller/user-controller')(app);
  require('./controller/category-controller')(app);
  require('./controller/token-event-controller')(app);
  require('./controller/feedback-controller')(app);
  
  // to make angular routing works
  app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/dist/index-ng.html');
  });
}
