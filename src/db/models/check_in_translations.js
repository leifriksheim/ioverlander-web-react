module.exports = function (sequelize, DataTypes) {
  const check_in_translations = sequelize.define('check_in_translations', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: undefined,
      primaryKey: true,
      autoIncrement: true
    },
    check_in_id: {
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
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: undefined
    }
  }, {
    tableName: 'check_in_translations', underscored: true,
    classMethods: {
      associate: (models) => {
        check_in_translations.belongsTo(models.check_ins)
      }
    }
  })

  return check_in_translations
}
