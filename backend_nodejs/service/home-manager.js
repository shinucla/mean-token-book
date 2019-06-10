'use strict';

var request = require('request');

module.exports = class HomeManager {
  constructor() { /* ... */ }

  getRandomPhotos(callback) {
    request
      .get({ url: 'https://api.unsplash.com/photos/random?count=3&orientation=landscape',
	     headers: { Authorization: 'Client-ID ' + Config.unsplash.access_key }
	   }, (err, res, json) => {
	     callback(err, JSON.parse(json));
	   });
  }
}
