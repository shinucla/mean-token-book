'use strict';

var crypto = require('crypto');

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

module.exports = class CategoryManager {
  constructor() { /* ... */ }

  ////////////////////////////////////////////////////////////

  create(json, callback) {
    Domain
      .Family
      .create({ owner_id: json.ownerId,
                title: json.title })
      .then(data => callback(null, data))
      .catch(err => callback(new Error('failed creating family', 100), null))
      //.catch(err => {
      //  console.log('error: ', err);
      //  callback(err, null);
      //})
    ;
  }

  ////////////////////////////////////////////////////////////

  getFamily(json, callback) {
    Domain
      .Family
      .findOne({ where: { owner_id: json.ownerId }})
      .then(d => callback(null, d))
      .catch(err => callback(new Error('failed getting family', 100), null))
      //.catch(err => callback(err, null))
    ;
  }

  
}
