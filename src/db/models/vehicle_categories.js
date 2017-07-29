/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('vehicle_categories', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: undefined,
			primaryKey: true
		},
		identifier: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		sort_order: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		icon: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		description: {
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
		}
	}, {
		tableName: 'vehicle_categories', underscored: true
	});
};
