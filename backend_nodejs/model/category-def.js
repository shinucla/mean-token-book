'user strict';

module.exports = function (Sequelize) {
  return { schema: { family_id: { type: Sequelize.DataTypes.INTEGER, allowNull: false }, //unique: true
                     label: { type: Sequelize.DataTypes.STRING, allowNull: false },
                     status: { type: Sequelize.DataTypes.INTEGER, allowNull: false },
		     
                   },
           indexes: [{ unique: true, fields: ['id'] },
                     { unique: true, fields: ['family_id', 'label'] },
                     { fields: ['family_id'] }
                    ],

           classMethods: {

           },

           instanceMethods: {

           },
         };
};
