'use strict';

module.exports = class CategoryManager {
  constructor() { /* ... */ }

  ////////////////////////////////////////////////////////////

  createCategory(json, callback) {
    Domain
      .Category
      .create({ family_id: json.familyId,
                label: json.label,
                description: json.description })
      .then(category => callback(null, category))
      .catch(err => callback(new Error('failed creating category', 100), null))
      //.catch(err => callback(err, null))
    ;
  }

  ////////////////////////////////////////////////////////////

  getCategories(json, callback) {
    Domain
      .Category
      .findAll({ where: { family_id: json.familyId }})
      .then(categories => callback(null, categories))
      .catch(err => callback(err, null))
    ;
  }
}
