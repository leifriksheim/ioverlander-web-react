/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const vehicles = sequelize.define('vehicles', {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: undefined
    },
    blog_id: {
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
    vehicle_category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: undefined
    },
    guid: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    }
  }, {
    tableName: 'vehicles', underscored: true,
    classMethods: {
      associate: (models) => {
        vehicles.belongsTo(models.blogs)
      }
    }
  })

  return vehicles
}
