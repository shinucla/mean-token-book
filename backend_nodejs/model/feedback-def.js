'user strict';

module.exports = function (Sequelize) {
  return { schema: { user_id: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
		     feedback: { type: Sequelize.DataTypes.STRING, allowNull: false },
                   },
           indexes: [{ unique: true, fields: ['id'] },
                     { fields: ['user_id'] },
                    ],

           classMethods: {

           },

           instanceMethods: {

           },
         };
};
