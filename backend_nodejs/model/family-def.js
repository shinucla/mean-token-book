'user strict';

module.exports = function (Sequelize) {
  return { schema: { owner_id: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
		     title: { type: Sequelize.DataTypes.STRING, allowNull: false, defaultValue: 'My Family' },
                   },
           indexes: [{ unique: true, fields: ['id'] },
		     { unique: true, fields: ['owner_id'] },
		    ],

           classMethods: {

           },

           instanceMethods: {

           },
         };
};
