/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const PlaceCategory = sequelize.define('place_categories', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: undefined,
      primaryKey: true
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    name_regex: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: undefined
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    places_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: undefined
    },
    sort_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: undefined
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: undefined
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: undefined
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    gpx_symbol: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    }
  })
  PlaceCategory.tableName = 'place_categories'
  PlaceCategory.associate = (models) => {
    PlaceCategory.hasMany(models.place_categories_property_defs)
  }

  return PlaceCategory
}
