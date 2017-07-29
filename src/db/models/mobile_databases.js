/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('mobile_databases', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: undefined,
			primaryKey: true
		},
		dbfile_fingerprint: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		dbfile_decompressed_fingerprint: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		version: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: '1'
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
		dbfile_file_name: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		dbfile_content_type: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		dbfile_file_size: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		dbfile_updated_at: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: undefined
		},
		dbfile_decompressed_size: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		status: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: 'generated'
		},
		dbtype: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: 'all_places'
		}
	}, {
		tableName: 'mobile_databases', underscored: true
	});
};
