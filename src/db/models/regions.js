/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const regions = sequelize.define('regions', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: undefined,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    identifier: {
      type: DataTypes.STRING,
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
    }
  }, {
    tableName: 'regions', underscored: true,
    classMethods: {
      associate: function (models) {
				regions.hasMany(models.countries)
			}
    }
  })

  return regions
}
