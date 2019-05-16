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

  require('./controller/user-controller')(app);
  require('./controller/token-event-controller')(app);
}
