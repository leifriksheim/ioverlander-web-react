module.exports = function (sequelize, DataTypes) {
  const CheckInTranslation = sequelize.define('check_in_translations', {
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
  })
  CheckInTranslation.tableName = 'check_in_translations'
  CheckInTranslation.associate = (models) => {
    CheckInTranslation.belongsTo(models.check_ins)
  }

  return CheckInTranslation
}
