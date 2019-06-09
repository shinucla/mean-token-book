'use strict';

/*
 * Google JSON guide:
 *   https://google.github.io/styleguide/jsoncstyleguide.xml
 *   { data: { ... }}
 *   { error: { code: <int>, message: <string> }}
 */
module.exports = function(app) {

  app
    .route('/api/token-event/create')
    .post(app.apiRequiredLogin,
          app.apiRequiredParent,
          app.apiRequiredFamily,
          (req, res, next) => {
            var json = { familyId: req.user.family_id,
                         userId: req.body.userId,
                         fromUserId: req.user.id,
                         amount: req.body.amount,
                         categoryId: req.body.categoryId,
                         description: req.body.description };

            TokenEventManager.createTokenEvent(json, (err, event) => {
              if (err) return next(err);
              res.status(200).send({ data: event });
            });
          });

  ////////////////////////////////////////////////////////////

  app
    .route('/api/token-event/getChildrenTokenEvents')
    .post(app.apiRequiredLogin,
          app.apiRequiredFamily,
          (req, res, next) => {
            var json  = { familyId: req.user.family_id };

            if (AppConstants.RoleEnum.CHILD.id === req.user.role_id) {
              json.userId = req.user.id;
            }

            TokenEventManager.getChildrenTokenEvents(json, (err, data) => {
              if (err) return next(err);
              res.status(200).send({ data: data });
            });
          });

  ////////////////////////////////////////////////////////////

  app
    .route('/api/token-event/getChildrenTokenCounts')
    .post(app.apiRequiredLogin,
          app.apiRequiredFamily,
          (req, res, next) => {
            var json  = { familyId: req.user.family_id };

            if (AppConstants.RoleEnum.CHILD.id === req.user.role_id) {
              json.userId = req.user.id;
            }

            TokenEventManager.getChildrenTokenCounts(json, (err, data) => {
              if (err) return next(err);
              res.status(200).send({ data: data });
            });
          });

  ////////////////////////////////////////////////////////////
};
