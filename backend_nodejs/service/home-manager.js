'use strict';

var request = require('request');

module.exports = class HomeManager {
  constructor() { /* ... */ }

  getRandomPhotos(config, callback) {
    var params = '';
    for (const [k,v] of Object.entries(config)) {
      params += ((0 === params.length ? '?' : '&') + k + '=' + v);
    }
    request
      .get({ url: 'https://api.unsplash.com/photos/random' + params,
	     headers: { Authorization: 'Client-ID ' + Config.unsplash.access_key }
	   }, (err, res, json) => {
	     callback(err, JSON.parse(json));
	   });
  }
}
