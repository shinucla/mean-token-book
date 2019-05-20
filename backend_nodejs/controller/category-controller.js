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
    .route('/api/category/getCategories')
    .post(app.apiRequiredLogin,
          (req, res, next) => {
            if (null === req.user.family_id) {
              res.status(400).send({ error: { code: AppConstants.ErrorEnum.NOT_AUTHORIZED.id,
                                              message: 'not allowed' }});
            }
            next();
          },
          (req, res, next) => {
            var json  = { familyId: req.user.family_id };

            CategoryManager.getCategories(json, (err, data) => {
              if (err) return next(err);
              res.status(200).send({ data: data });
            });
          });

  ////////////////////////////////////////////////////////////

  app
    .route('/api/category/create')
    .post(app.apiRequiredLogin,
          (req, res, next) => {
            if (null === req.user.family_id) {
              res.status(400).send({ error: { code: AppConstants.ErrorEnum.NOT_AUTHORIZED.id,
                                              message: 'not allowed' }});
            }
            next();
          },
          (req, res, next) => {
            var json = { familyId: req.user.family_id,
                         label: req.body.label,
                         description: req.body.description };

            CategoryManager.createCategory(json, (err, data) => {
              if (err) return next(err);
              res.status(200).send({ data: data });
            });
          });

};
