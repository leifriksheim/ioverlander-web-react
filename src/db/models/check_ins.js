/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const CheckIn = sequelize.define('check_ins', {
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
  })
  CheckIn.tableName = 'check_ins'
  CheckIn.timestamps = false
  CheckIn.associate = (models) => {
    CheckIn.hasMany(models.check_in_translations)
    CheckIn.belongsTo(models.places)
    CheckIn.belongsTo(models.locations)
    CheckIn.belongsTo(models.blogs)
  }
  return CheckIn
}
