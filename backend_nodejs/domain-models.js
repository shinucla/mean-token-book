'use strict';

/* Automatically pass the transaction to all queries:
 *  - use Continuation Local Storage (CLS) module and instantiate a namespace
 *  - needs: 'cls-hooked', instead of 'continuation_local_storage'
 */
var cls = require('cls-hooked');
var Sequelize = require('sequelize');
var onFinished = require('on-finished');

var namespace = cls.createNamespace('my-very-own-namespace-alt');
Sequelize.useCLS(namespace);

var sequelize = new Sequelize(Config.mysql.db,
                              Config.mysql.user_name,
                              Config.mysql.password,
                              { host: Config.mysql.host,
                                dialect: 'mysql',
                                pool: Config.mysql.pool_config,
                                operatorsAliases: false,
                                logging: false
                              });

// ------------------------------------------------------------

async function initTransaction() {
  return await sequelize.transaction({ isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
                                       autocommit: false });
}

function defineModel(name, def) {
  var model = sequelize.define(name, def.schema, { freezeTableName: true,
                                                   timestamps: false,
                                                   indexes: def.indexes || [],
                                                 });
  for (var key in def.classMethods) {
    model[key] = def.classMethods[key];
  }

  for (var key in def.instanceMethods) {
    model.prototype[key] = def.instanceMethods[key];
  }

  return model;
}

function TransactionMiddleware(req, res, next) {
  namespace.bindEmitter(req);
  namespace.bindEmitter(res);
  namespace.bind(next);
  namespace.run(async () => {
    try {
      const transaction = await initTransaction(); // await sequelize.transaction();
      namespace.set('transaction', transaction);

      //res.on('finish', async () => {
      // TODO
      //});

      onFinished(res, async (err) => {
        if (!transaction.finished) {
          if (!err) {
            await transaction.commit();

          } else {
            console.log(err);
            await transaction.rollback();
          }
        }
      });
    } catch (err) {
      next(new Error('Timeout! Please try again later!'));
    }

    next();
  });
}

/*
 * Definie error format: because not all errors should result in rollback
 *                       we might only rollback for transaction ralated errors
 *                       but do want to commit if otherwise
 */
async function TransactionErrorHandlerMiddleware(err, req, res, next) {
  await namespace.get('transaction').rollback();
  res.status(500).send({ error: err.message });
}

// ------------------------------------------------------------

var User = defineModel('user', require('./model/user-def')(Sequelize));
var UserAuth = defineModel('user_auth', require('./model/user-auth-def')(Sequelize));
var Family = defineModel('family', require('./model/family-def')(Sequelize));
var Category = defineModel('category', require('./model/category-def')(Sequelize));
var TokenEvent = defineModel('token_event', require('./model/token-event-def')(Sequelize));
var TokenRule = defineModel('token_rule', require('./model/token-rule-def')(Sequelize));

async function init() {
  await User.sync();
  await UserAuth.sync();
  await Family.sync();
  await Category.sync();
  await TokenEvent.sync();
  await TokenRule.sync();
}

var domain = {
  /* methods */
  init: init,
  TransactionMiddleware: TransactionMiddleware,
  TransactionErrorHandlerMiddleware: TransactionErrorHandlerMiddleware,
  Sequelize: Sequelize,

  /* models */
  User: User,
  UserAuth: UserAuth,
  Family: Family,
  Category: Category,
  TokenEvent: TokenEvent,
  TokenRule: TokenRule,
};

module.exports = domain;
