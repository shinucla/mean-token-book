'user strict';

module.exports = function (Sequelize) {
  return { schema: { category_id: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
		     label: { type: Sequelize.DataTypes.STRING, allowNull: false, unique: true },
		     description: { type: Sequelize.DataTypes.STRING, allowNull: false },
		     suggested_amount: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
		     status: { type: Sequelize.DataTypes.INTEGER, allowNull: false }, // 0 - active, 1 - deleted
		   },
           indexes: [{ unique: true, fields: ['id'] },
		     { fields: ['category_id'] }
		    ],

           classMethods: {

           },

           instanceMethods: {
	     
           },
         };
};
