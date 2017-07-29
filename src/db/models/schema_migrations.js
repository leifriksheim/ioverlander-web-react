/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('schema_migrations', {
		version: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: undefined
		}
	}, {
		tableName: 'schema_migrations', underscored: true
	});
};
