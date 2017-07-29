/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('opro_client_apps', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: undefined,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		app_id: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		app_secret: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		permissions: {
			type: DataTypes.TEXT,
			allowNull: true,
			defaultValue: undefined
		},
		user_id: {
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
		tableName: 'opro_client_apps', underscored: true
	});
};
