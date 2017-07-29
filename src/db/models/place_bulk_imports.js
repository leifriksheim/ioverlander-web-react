/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('place_bulk_imports', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: undefined,
			primaryKey: true
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		stage: {
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
		csvfile_file_name: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		csvfile_content_type: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		csvfile_file_size: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		csvfile_updated_at: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: undefined
		},
		import_status: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		}
	}, {
		tableName: 'place_bulk_imports', underscored: true
	});
};
