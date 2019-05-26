// filename: config.js

var config = {};

config.web = {};
config.web.port = process.env.PORT || 8181; // $sudo PORT=8080 node app.js
config.web.env = 'dev'; // dev, prod

config.auth = {};
config.auth.algorithm = 'aes-256-ctr';
config.auth.secret = 'string';

config.mysql = {};
config.mysql.db = 'string';
config.mysql.host = 'string';
config.mysql.user_name = 'string';
config.mysql.password = 'string';
config.mysql.pool_config = { max: 5,
			     min: 0,
			     acquire: 120000,
			     idle: 30000 };

module.exports = config;
