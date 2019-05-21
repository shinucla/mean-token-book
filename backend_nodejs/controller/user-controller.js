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

      if (req.user && req.user.family_id) {
        json.familyId = req.user.family_id;
      }

      UserAuthManager.signupByUserNameEmail(json, function(err, jwt) {
        if (err) return next(err);
        res.status(200).send({ data: { jwt: jwt }});
      });
    });

  ////////////////////////////////////////////////////////////

  app
    .route('/api/user/signupChild')
    .post(app.apiRequiredLogin,
          app.apiRequiredParent,
          app.apiRequiredFamily,
          (req, res, next) => {
            var json  = { 'familyId': req.user.family_id,
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
    .route('/api/user/createFamily')
    .post(app.apiRequiredLogin,
          app.apiRequiredParent,
          (req, res, next) => {
            var json  = { ownerId: req.user.id,
                          title: req.body.title };

            FamilyManager.create(json, (err,  family) => {
              if (err) return next(err);

              UserAuthManager.updateFamily({ familyId: family.id,
                                             ownerId: req.user.id },
                                           (err, user) => {
                                             if (err) return next(err);

                                             res.status(200).send({ data: family });
                                           });
            });
          });

  ////////////////////////////////////////////////////////////

  app
    .route('/api/user/getFamily')
    .post(app.apiRequiredLogin,
          app.apiRequiredFamily,
          (req, res, next) => {
            var json  = { ownerId: req.user.id };

            FamilyManager.getFamily(json, (err, data) => {
              if (err) return next(err);
              res.status(200).send({ data: data });
            });
          });

  ////////////////////////////////////////////////////////////

  app
    .route('/api/user/getChildren')
    .post(app.apiRequiredLogin,
          app.apiRequiredParent,
          app.apiRequiredFamily,
          (req, res, next) => {
            UserAuthManager.getChildren({ familyId: req.user.family_id }, (err, users) => {
              if (err) return next(err);
              res.status(200).send({ data: { users: users }});
            });
          });


  app
    .route('/api/user/getFamilyMembers')
    .post(app.apiRequiredLogin,
          app.apiRequiredParent,
          app.apiRequiredFamily,
          (req, res, next) => {
            UserAuthManager.getFamilyMembers({ familyId: req.user.family_id }, (err, users) => {
              if (err) return next(err);
              res.status(200).send({ data: { members: users,
                                             family: users[0].family }});
            });
          });

};
