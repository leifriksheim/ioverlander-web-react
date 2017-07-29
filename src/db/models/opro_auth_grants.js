/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('opro_auth_grants', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: undefined,
			primaryKey: true
		},
		code: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		access_token: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		refresh_token: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		permissions: {
			type: DataTypes.TEXT,
			allowNull: true,
			defaultValue: undefined
		},
		access_token_expires_at: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: undefined
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		application_id: {
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
		tableName: 'opro_auth_grants', underscored: true
	});
};
