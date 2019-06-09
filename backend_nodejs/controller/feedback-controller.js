'use strict';

module.exports = function(app) {

  ////////////////////////////////////////////////////////////

  app
    .route('/api/feedback/getFeedbacks')
    .post(app.apiRequiredLogin,
          app.apiRequiredParent,
          (req, res, next) => {
            var json  = { userId: req.user.id };
	    
            FeedbackManager.getFeedbacks(json, (err, data) => {
              if (err) return next(err);
              res.status(200).send({ data: data });
            });
          });

  ////////////////////////////////////////////////////////////

  app
    .route('/api/feedback/create')
    .post(app.apiRequiredLogin,
          app.apiRequiredParent,
          (req, res, next) => {
            var json = { userId: req.user.id,
                         feedback: req.body.feedback };

            FeedbackManager.create(json, (err, data) => {
              if (err) return next(err);
              res.status(200).send({ data: data });
            });
          });

  ////////////////////////////////////////////////////////////

  app
    .route('/api/feedback/delete')
    .post(app.apiRequiredLogin,
          app.apiRequiredParent,
          (req, res, next) => {
            FeedbackManager.delete({ id: req.body.id }, (err, data) => {
              if (err) return next(err);
              res.status(200).send({ data: data });
            });
          });
};
