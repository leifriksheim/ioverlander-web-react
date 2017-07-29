/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const categoryPropertyDefs = sequelize.define('place_categories_property_defs', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: undefined,
      primaryKey: true
    },
    property_def_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: undefined
    },
    place_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: undefined
    }
  }, {
    tableName: 'place_categories_property_defs',
    underscored: true,
    timestamps: false,
    classMethods: {
      associate: (models) => {
        categoryPropertyDefs.belongsTo(models.property_defs)
      }
    }
  })

  return categoryPropertyDefs
}
