/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('issues', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: undefined,
			primaryKey: true
		},
		guid: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		task_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		issueable_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		issueable_type: {
			type: DataTypes.STRING,
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
		issue_type: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		status: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		comment: {
			type: DataTypes.TEXT,
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
		tableName: 'issues', underscored: true
	});
};
