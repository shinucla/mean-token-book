'use strict';

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
