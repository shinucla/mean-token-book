'use strict';

/*
 * Google JSON guide:
 *   https://google.github.io/styleguide/jsoncstyleguide.xml
 *   { data: { ... }}
 *   { error: { code: <int>, message: <string> }}
 */
module.exports = function(app) {

  ////////////////////////////////////////////////////////////

  app
    .route('/api/token-event/getChildrenTokenBalance')
    .post(app.apiRequiredLogin,
          (req, res, next) => {
            var json  = { 'parentId': req.user.id };

            TokenManager.getChildrenTokenBalance(json, (err, data) => {
              if (err) return next(err);
              res.status(200).send({ data: { balances: data }});
            });
          });

  ////////////////////////////////////////////////////////////

  app
    .route('/api/token-event/getBalance')
    .post(app.apiRequiredLogin,
          (req, res, next) => {
            var json  = { 'userId': req.user.id };

            TokenManager.getBalance(json, (err, data) => {
              if (err) return next(err);
              res.status(200).send({ data: { balances: data }});
            });
          });

  ////////////////////////////////////////////////////////////

  app
    .route('/api/tokenevent/create')
    .post(app.apiRequiredLogin,
          (req, res, next) => {
            TokenEventManager.createTokenEvent(req.body, (err, event) => {
              if (err) return next(err);
              res.status(200).send({ data: event });
            });
          });

  ////////////////////////////////////////////////////////////
};
