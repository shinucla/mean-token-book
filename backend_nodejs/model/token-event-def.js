'user strict';

module.exports = function (Sequelize) {
  return { schema: { family_id: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
                     user_id: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
		     from_user_id: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
		     date: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
		     year: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
		     month: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
		     day: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
		     day_of_week: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
		     utc: { type: Sequelize.DataTypes.BIGINT, allowNull: false },
		     amount: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
                     category_id: { type: Sequelize.DataTypes.INTEGER, allowNull: true },
		     description: { type: Sequelize.DataTypes.STRING, allowNull: false },
                   },
           indexes: [{ fields: ['family_id'] },
		     { fields: ['user_id'] },
		     { fields: ['from_user_id'] },
		     { fields: ['date'] },
		     { fields: ['year'] },
		     { fields: ['month'] },
		     { fields: ['day'] },
		     { fields: ['day_of_week'] },
		     { fields: ['category_id'] },
		    ],

           classMethods: {

           },

           instanceMethods: {

           },
         };
};


// token: 10, reason:
