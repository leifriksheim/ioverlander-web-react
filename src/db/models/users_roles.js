/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users_roles', {
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		role_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		}
	}, {
		tableName: 'users_roles', underscored: true, timestamps: false
	});
};
