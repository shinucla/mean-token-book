'user strict';

module.exports = function (Sequelize) {
  return { schema: { parent_id: { type: Sequelize.DataTypes.INTEGER, allowNull: true },
		     username: { type: Sequelize.DataTypes.STRING, allowNull: false },
		     email: { type: Sequelize.DataTypes.STRING, allowNull: true },
		     first_name: { type: Sequelize.DataTypes.STRING, allowNull: false, defaultValue: 'Guest' },
                     last_name: { type: Sequelize.DataTypes.STRING, allowNull: false, defaultValue: 'Guest' },
		     birth_date: { type: Sequelize.DataTypes.INTEGER, allowNull: true },
                     status: { type: Sequelize.DataTypes.INTEGER, allowNull: false },     // 0: delete 1: active 2: inactive
                     role_id: { type: Sequelize.DataTypes.INTEGER, allowNull: true },   // lower case: 'admin', 'member', 'guest'
                   },
           indexes: [{ unique: true, fields: ['id'] },
		     { unique: true, fields: ['username'] },
		     { unique: true, fields: ['email'] },
		     { fields: ['parent_id'] },
		    ],

           classMethods: {

           },

           instanceMethods: {
	     
           },
         };
};
