'use strict';

var crypto = require('crypto');
var bcrypt    = require('bcrypt-nodejs');
var JWT       = require('jsonwebtoken');

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

/* move to another service or utility */
function encode(text) {
  var cipher = crypto.createCipher(Config.auth.algorithm, Config.auth.secret)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decode(text) {
  var decipher = crypto.createDecipher(Config.auth.algorithm, Config.auth.secret)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

// ------------------------------------------------------------

module.exports = class UserAuthManager {
  constructor() { /* ... */ }

  ////////////////////////////////////////////////////////////

  verifyToken(jwt, callback) { /* callback(err, decodedUser) */
    JWT.verify(jwt, Config.auth.secret, (err, obj) => {
      Domain
        .User
        .findOne({ where: { id: err ? null : obj.id }})
        .then(user => callback(user
                               ? null
                               : new Error("Invalid User"),
                               user))
        .catch(callback);
    });
  }

  ////////////////////////////////////////////////////////////

  encode(val) {
    return encode(val);
  }

  ////////////////////////////////////////////////////////////

  async getUserAuth(user) {
    return null === user ? null : await Domain.UserAuth.findOne({ where: { user_id: user.id }});
  }

  ////////////////////////////////////////////////////////////

  comparePasswordHash(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  ////////////////////////////////////////////////////////////

  async signupByUserNameEmail(json, callback) {
    var conditions = [];
    if (json.username) {
      conditions.push({ username: json.username.toLowerCase() });
    }
    if (json.email) {
      conditions.push({ email: json.email.toLowerCase() });
    }

    var $or = Domain.Sequelize.Op.or;
    var existingUser = await Domain.User.findOne({ where: { [$or]: conditions }, raw: true });

    if (null != existingUser) {
      callback(new Error('The username or email has been taken.'), null);

    } else {
      Domain.User
        .create({ family_id: json.familyId,
                  first_name: json.firstName,
                  last_name: json.lastName,
                  username: (json.username ? json.username.toLowerCase() : null),
                  email: (json.email ? json.email.toLowerCase() : null),
                  status: json.status,
                  role_id: json.roleId })
        .then(user => Domain.UserAuth.create({ user_id: user.id,
                                               jwt: JWT.sign(user.get({ plain: true }), Config.auth.secret),
                                               password_hash: generateHash(json.password) }))
        .then(auth => callback(null, auth.jwt))
        .catch(err => callback(new Error('signup failed', 100), null))
      ;
    }
  }

  ////////////////////////////////////////////////////////////

  signupByFacebook(json, callback) {
    Domain.User
      .create({ first_name: json.firstName,
                last_name: json.lastName,
                username: json.email.toLowerCase(),
                email: json.email.toLowerCase(),
                status: 1 })
      .then(user => Domain.UserAuth.create({ user_id: user.id,
                                             jwt: JWT.sign(user.get({ plain: true }), Config.auth.secret),
                                             access_token_encode: encode(json.token),
                                             access_token_type: 1 }))
      .then(auth => callback(null, auth.jwt))
      .catch(err => callback(new Error('signup failed', 100), null))
    ;
  }

  ////////////////////////////////////////////////////////////

  async loginByUserNameEmail(json, callback) {
    var conditions = [];
    if (json.username) {
      conditions.push({ username: json.username.toLowerCase() });
    }
    if (json.email) {
      conditions.push({ email: json.email.toLowerCase() });
    }

    var $or = Domain.Sequelize.Op.or;
    var user = await Domain.User.findOne({ where: { [$or]: conditions }, raw: true });
    var auth = await this.getUserAuth(user);

    if (null === user || null === auth) {
      /* --- User not found */
      callback(new Error('The email/username/password you entered is incorrect.'), null);

    } else if (null != json.password && this.comparePasswordHash(json.password, auth.password_hash)) {
      /* --- User Found With Correct Password */
      callback(null, { user: user, jwt: auth.jwt });

    } else {
      /* --- User Found With Incorrect Password */
      callback(new Error('Incorrect Password'), null);
    }
  }

  ////////////////////////////////////////////////////////////

  getChildren(json, callback) {
    Domain
      .withRows('  select id, first_name, last_name'
		+ '  from user'
		+ ' where family_id = ' + json.familyId
		+ '   and 0 < role_id & ' + AppConstants.RoleEnum.CHILD.id
		+ ' order by first_name')
      .then(users => callback(null, users))
      .catch(err => callback(new Error('getting children failed', 100), null))
    ;
  }

  ////////////////////////////////////////////////////////////

  updateFamily(json, callback) {
    Domain
      .User
      .update({ family_id: json.familyId },
              { returning: true,
                where: { id: json.ownerId }})
      .then(data => callback(null, data))
      .catch(err => callback(new Error('update family failed', 100), null))
      //.catch(err => callback(err, null))
    ;
  }

  getFamilyMembers(json, callback) {
    var where = { family_id: json.familyId };

    if (json.userId) {
      where.id = json.userId;
    }

    Domain.Family.hasMany(Domain.User, { foreignKey: 'family_id' });
    Domain.User.belongsTo(Domain.Family, { foreignKey: 'family_id' });
    Domain
      .User
      .findAll({ where: where,
                 include: [ Domain.Family ]
               })
      .then(data => callback(null, data))
      .catch(err => callback(new Error('cannot get family memebers'), null));
  }
}
