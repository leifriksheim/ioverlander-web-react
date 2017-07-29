/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('countries', {
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
		code2: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		region_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		currency_code: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		places_count: {
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
		},
		latitude: {
			type: DataTypes.FLOAT,
			allowNull: true,
			defaultValue: undefined
		},
		longitude: {
			type: DataTypes.FLOAT,
			allowNull: true,
			defaultValue: undefined
		}
	}, {
		tableName: 'countries', underscored: true
	});
};
