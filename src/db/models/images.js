/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('images', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: undefined,
      primaryKey: true,
      autoIncrement: true
    },
    source_url: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    guid: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: undefined
    },
    imageable_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: undefined
    },
    imageable_type: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    jpgfile_fingerprint: {
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
    jpgfile_file_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    jpgfile_content_type: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: undefined
    },
    jpgfile_file_size: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: undefined
    },
    jpgfile_updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: undefined
    },
    jpgfile_processing: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: undefined
    }
  }, {
    tableName: 'images', underscored: true
  })
}
