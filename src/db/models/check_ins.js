/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const check_ins = sequelize.define('check_ins', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: undefined,
      primaryKey: true,
      autoIncrement: true
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: undefined
    },
    place_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: undefined
    },
    visited: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: undefined
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: undefined
    },
    trip_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: undefined
    },
    guid: {
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
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: undefined
    },
    vehicle_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: undefined
    }
  }, {
    tableName: 'check_ins', underscored: true, timestamps: false,
    classMethods: {
      associate: (models) => {
        check_ins.hasMany(models.check_in_translations)
        check_ins.belongsTo(models.places)
        check_ins.belongsTo(models.locations)
        check_ins.belongsTo(models.blogs)
      }
    }
  })

  return check_ins
}
