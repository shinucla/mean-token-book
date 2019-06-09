'use strict';

module.exports = class FeedbackManager {
  constructor() { /* ... */ }

  ////////////////////////////////////////////////////////////

  create(json, callback) {

    if (!json.feedback || 0 === json.feedback.trim().length) {
      return callback(new Error('feedback cannot be empty.'), null);
    }
    
    Domain
      .Feedback
      .create({ user_id: json.userId,
                feedback: json.feedback })
      .then(data => callback(null, data))
      .catch(err => callback(new Error('failed creating feedback', 100), null))
      //.catch(err => callback(err, null))
    ;
  }

  ////////////////////////////////////////////////////////////

  delete(json, callback) {
    Domain
      .Feedback
      .destroy({ where: json })
      .then(data => callback(null, data))
      .catch(err => callback(new Error('failed deleting feedback', 100), null))
      //.catch(err => callback(err, null))
    ;
  }

  ////////////////////////////////////////////////////////////

  getFeedbacks(json, callback) {
    Domain
      .Feedback
      .findAll({ where: { user_id: json.userId }})
      .then(data => callback(null, data))
      .catch(err => callback(new Error('getting feedbacks failed', 100), null))
      //.catch(err => callback(err, null))
    ;
  }
}
