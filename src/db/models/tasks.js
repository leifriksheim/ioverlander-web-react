/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tasks', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: undefined,
			primaryKey: true
		},
		task_type_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		priority: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		status: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		reference_object_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		reference_object_type: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		source_object_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		source_object_type: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		version_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		translate_version_id: {
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
	}, {
		tableName: 'tasks', underscored: true
	});
};
