/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const translations = sequelize.define('place_translations', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: undefined,
      primaryKey: true,
      autoIncrement: true
    },
    place_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: undefined
    },
    locale: {
      type: DataTypes.STRING,
      allowNull: false,
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: undefined
    }
  }, {
    tableName: 'place_translations',
    underscored: true,
    classMethods: {
      associate: (models) => {
        translations.belongsTo(models.places)
      }
    }
  })

  return translations
}
