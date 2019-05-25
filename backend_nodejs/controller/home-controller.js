'use strict';

module.exports = function(app) {
  app
    .route('/')
    .get((req, res, next) => {
      res.send('index.html');
    });

  app
    .route('/index.html')
    .get((req, res, next) => {
      res.send('index.html');
    });

  app
    .route('/home')
    .get((req, res, next) => {
      res.send('index.html');
    });
};
