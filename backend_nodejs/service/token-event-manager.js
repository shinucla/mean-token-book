'use strict';

module.exports = class TokenEventManager {
  constructor() { /* ... */ }

  ////////////////////////////////////////////////////////////

  createTokenEvent(json, callback) {
    var date = new Date();
    Domain.TokenEvent
      .create({ family_id: json.familyId,
                user_id: json.userId,
                from_user_id: json.fromUserId,
                date: parseInt(new Date().toISOString().slice(0,10).split('-').join('')),
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
		day_of_week: date.getDay(),
                utc: date.getTime(),
		amount: json.amount,
		category_id: json.categoryId,
		description: json.description })
      .then(event => callback(null, event))
    //.catch(err => callback(new Error('failed creating token event', 100), null))
      .catch(err => callback(err, null))
    ;
  }

  ////////////////////////////////////////////////////////////

  getChildrenTokenEvents(json, callback) {
    Domain.User.hasMany(Domain.TokenEvent, { foreignKey: 'user_id'});
    Domain.TokenEvent.belongsTo(Domain.User, { foreignKey: 'user_id'});
    Domain
      .TokenEvent
      .findAll({ family_id: json.familyId }, { include: [ Domain.User ]})
      .then(events => callback(null, events))
      .catch(err => callback(err, null))
    ;
  }
}
