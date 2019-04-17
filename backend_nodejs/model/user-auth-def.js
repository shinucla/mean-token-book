'use strict';

module.exports = function (Sequelize) {
  return { schema: { user_id: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
                     jwt: { type: Sequelize.DataTypes.STRING(512), allowNull: false },

                     password_hash: { type: Sequelize.DataTypes.STRING, allowNull: true },
                     access_token_encode: { type: Sequelize.DataTypes.TEXT, allowNull: true },
                     access_token_type: { type: Sequelize.DataTypes.INTEGER, allowNull: true }, // 1. FB, 2. GOOGLE
                   },
           indexes: [{ unique: true, fields: ['id'] }, { fields: ['user_id'] }],

           classMethods: {
           },

           instanceMethods: {
             setAccessToken: function(val) {
               this.access_token_encode = UserAuthManager.encode(val);
               return this;
             },
           }
         };
}
