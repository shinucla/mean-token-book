'use strict';

/*
 * Google JSON guide:
 *   https://google.github.io/styleguide/jsoncstyleguide.xml
 *   { data: { ... }}
 *   { error: { code: <int>, message: <string> }}
 */
module.exports = function(app) {
  var fs = require('fs');
  var request = require('request');
  var FB = require('../service/facebook-service');

  ////////////////////////////////////////////////////////////

  app
    .route('/api/user/signupParent')
    .post(function(req, res, next) {
      var json  = { 'firstName': req.body.firstName,
                    'lastName': req.body.lastName,
                    'email': req.body.email,
                    'username': req.body.username,
                    'password': req.body.password,
                    'status': 0,
                    'roleId': AppConstants.RoleEnum.PARENT.id };

      UserAuthManager.signupByUserNameEmail(json, function(err, jwt) {
        if (err) return next(err);
        res.status(200).send({ data: { jwt: jwt }});
      });
    });

  ////////////////////////////////////////////////////////////

  app
    .route('/api/user/signupChild')
    .post(app.apiRequiredLogin,
          (req, res, next) => {
            if (AppConstants.RoleEnum.PARENT.id !== req.user.role_id) {
              res.status(400).send({ error: { code: AppConstants.ErrorEnum.NOT_AUTHORIZED.id,
                                              message: 'not allowed' }});
            }
            next();
          },
          (req, res, next) => {
            var json  = { 'parentId': req.user.id,
                          'firstName': req.body.firstName,
                          'lastName': req.body.lastName,
                          'username': req.body.username,
                          'password': req.body.password,
                          'status': 0,
                          'roleId': AppConstants.RoleEnum.CHILD.id };

            UserAuthManager.signupByUserNameEmail(json, (err, jwt) => {
              if (err) return next(err);
              res.status(200).send({ data: { jwt: jwt }});
            });
          });

  ////////////////////////////////////////////////////////////

  app
    .route('/api/user/login')
    .post(function(req, res, next) {
      var json  = { 'username': req.body.username,
                    'email': req.body.email,
                    'password': req.body.password,
                    'fbAccessToken': req.body.fbAccessToken };

      UserAuthManager.loginByUserNameEmail(json, function(err, userjwt) {
        if (err) return next(err);
        res.status(200).send({ data: userjwt });
      });
    });

  ////////////////////////////////////////////////////////////

  app
    .route('/api/user/loginByFacebook')
    .post(function(req, res, next) {
      var token = req.body.token;

      new FB().get('me',
                   new FB.Params().setParam('fields','first_name,last_name,email'),
                   token,
                   async (err, json) => {
                     if (err) {
                       next(err);

                     } else {
                       var existing = await Domain.User.findOne({ where: { email: json.email }});
                       var auth = null === existing ? null : await Domain.UserAuth.findOne({ where: { user_id: existing.id }});

                       if (null === existing) {
                         UserAuthManager.signupByFacebook({ firstName: json.first_name,
                                                            lastName: json.last_name,
                                                            email: json.email,
                                                            token: token },
                                                          (err, jwt) => {
                                                            if (err) return next(err);
                                                            res.status(200).send({ data: { jwt: jwt }});
                                                          });
                       } else {
                         await cre.setAccessToken(token).save();
                         res.status(200).send({ data: { jwt: cre.jwt }});
                       }
                     }
                   });
    });

  ////////////////////////////////////////////////////////////

  app
    .route('/api/user/getChildren')
    .post(app.apiRequiredLogin,
	  (req, res, next) => {
	    UserAuthManager.getChildren({ parentId: req.user.id }, (err, users) => {
	      if (err) return next(err);
	      res.status(200).send({ data: { users: users }});
	    });
	  });

  ////////////////////////////////////////////////////////////
  
};
