'use strict';

module.exports = function(app) {

  ////////////////////////////////////////////////////////////

  app
    .route('/api/home/getRandomPhotos')
    .post((req, res, next) => {
      HomeManager.getRandomPhotos((err, data) => {
	if (err) return next(err);
	res.status(200).send({ data: data });
      });
    });
  
};
