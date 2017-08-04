module.exports = function (sequelize, DataTypes) {
  const Blog = sequelize.define('blogs', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: undefined,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: undefined
    },
    profile_image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: undefined
    },
    created_by_id: {
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
    }
  })
  Blog.tableName = 'blogs'
  Blog.associate = (models) => {
    Blog.hasMany(models.check_ins)
    Blog.hasOne(models.vehicles)
    Blog.hasMany(models.places)
  }
  return Blog
}
