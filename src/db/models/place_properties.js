/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('place_properties', {
    place_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: undefined,
      primaryKey: true
    },
    place_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: undefined
    },
    place_country_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: undefined
    },
    open_for_business: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: undefined
    },
    electricity: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: undefined
    },
    internet: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: undefined
    },
    kitchen: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: undefined
    },
    restaurant: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: undefined
    },
    showers: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: undefined
    },
    water: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: undefined
    },
    restroom: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: undefined
    },
    big_rig_friendly: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: undefined
    },
    tent_friendly: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: undefined
    },
    pet_friendly: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: undefined
    }
  }, {
    tableName: 'place_properties', underscored: true
  })
}
