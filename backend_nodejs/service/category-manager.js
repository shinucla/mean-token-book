'use strict';

module.exports = class CategoryManager {
  constructor() { /* ... */ }

  create(json, callback) {
    if (!json.label || 0 === json.label.trim().length) {
      return callback(new Error('label cannot be empty.'), null);
    } 

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

  update(json, callback) {
    if (!json.label || 0 === json.label.trim().length) {
      return callback(new Error('label cannot be empty.'), null);
    }

    Domain
      .Category
      .update({ label: json.label },
	      { returning: true,
		where: { id: json.id }})
      .then(category => callback(null, category))
      .catch(err => callback(new Error('failed updating category', 100), null))
      //.catch(err => callback(err, null))
    ;
  }

  delete(json, callback) {
    Domain
      .Category
      .update({ status: AppConstants.StatusEnum.DELETED.id },
	      { returning: true,
		where: json })
      .then(category => callback(null, category))
      .catch(err => callback(new Error('failed deleting category', 100), null))
      //.catch(err => callback(err, null))
    ;
  }
  
  ////////////////////////////////////////////////////////////

  getCategories(json, callback) {
    Domain
      .Category
      .findAll({ where: { family_id: json.familyId, status: AppConstants.StatusEnum.ACTIVE.id }})
      .then(categories => callback(null, categories))
      .catch(err => callback(err, null))
    ;
  }
}
