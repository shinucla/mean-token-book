'user strict';

module.exports = function (Sequelize) {
  return { schema: { parent_id: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
		     label: { type: Sequelize.DataTypes.STRING, allowNull: false, unique: true },
		     description: { type: Sequelize.DataTypes.STRING, allowNull: false },
		     is_positive: { type: Sequelize.DataTypes.BOOLEAN, allowNull: false },
		     status: { type: Sequelize.DataTypes.INTEGER, allowNull: false }, // 0 - active, 1 - deleted
		   },
           indexes: [{ unique: true, fields: ['id'] },
		     { fields: ['parent_id'] },
		     { fields: ['is_positive'] }],

           classMethods: {

           },

           instanceMethods: {
	     
           },
         };
};
