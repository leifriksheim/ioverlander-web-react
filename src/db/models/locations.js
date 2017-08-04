/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const Location = sequelize.define('locations', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: undefined,
      primaryKey: true,
      autoIncrement: true
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: undefined
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: undefined
    },
    altitude: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: undefined
    },
    horizontal_accuracy: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: undefined
    },
    vertical_accuracy: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: undefined
    },
    gpstime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: undefined
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    gps: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    gpslat: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    gpslng: {
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
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    state_code: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    country_code: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: undefined
    }
  })
  Location.tableName = 'locations'
  Location.associate = (models) => {
    Location.hasOne(models.places)
  }

  return Location
}
