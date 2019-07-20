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
      .catch(err => callback(new Error('failed creating token event', 100), null))
    //.catch(err => callback(err, null))
    ;
  }

  updateTokenEvent(json, callback) {
    Domain.TokenEvent
      .update({ user_id: json.userId,
                amount: json.amount,
		category_id: json.categoryId,
		description: json.description },
	      { returning: true,
		where: { id: json.id }})
      .then(event => callback(null, event))
      .catch(err => callback(new Error('failed updating token event', 100), null))
    //.catch(err => callback(err, null))
    ;
  }

  deleteTokenEvent(json, callback) {
    Domain.TokenEvent
      .destroy({ where: json })
      .then(event => callback(null, event))
      .catch(err => callback(new Error('failed deleting token event', 100), null))
    //.catch(err => callback(err, null))
    ;
  }
  
  ////////////////////////////////////////////////////////////

  getChildrenTokenEvents(json, callback) {
    Domain.User.hasMany(Domain.TokenEvent, { foreignKey: 'user_id'});
    Domain.Category.hasMany(Domain.TokenEvent, { foreignKey: 'category_id'});

    Domain.TokenEvent.belongsTo(Domain.User, { foreignKey: 'user_id'});
    Domain.TokenEvent.belongsTo(Domain.Category, { foreignKey: 'category_id'});

    var where = { family_id: json.familyId };
    if (json.userId) {
      where.user_id = json.userId;
    }

    Domain
      .TokenEvent
      .findAll({ where: where,
		 order: [['id', 'DESC']],
                 include: [ Domain.User, Domain.Category ]		 
               })
      .then(events => callback(null, events))
      .catch(err => callback(err, null))
    ;
  }

  ////////////////////////////////////////////////////////////

  getChildrenTokenCounts(json, callback) {
    Domain
      .withRows('  select u.first_name, u.last_name, u.id, sum(t.amount) as "sum"'
		+ '  from token_event t, user u'
		+ ' where t.user_id = u.id'
		+ '   and t.family_id = u.family_id'
		+ '   and t.family_id = ' + json.familyId
		+ '   and u.id = ' + (!!json.userId ? json.userId : 'u.id')
		+ ' group by u.id')
      .then(data => callback(null, data))
      .catch(err => callback(err, null))
    ;
  }

}
