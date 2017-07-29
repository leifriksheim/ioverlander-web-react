/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('currencies', {
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
		name: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		symbol: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		exchange_rate_usd: {
			type: DataTypes.FLOAT,
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
		tableName: 'currencies', underscored: true
	});
};
