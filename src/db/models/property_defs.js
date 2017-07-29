/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('property_defs', {
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
		name: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		name_regex: {
			type: DataTypes.TEXT,
			allowNull: true,
			defaultValue: undefined
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		default_value_json: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		placeholder: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		input: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		prop_type: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		sort_order: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		required: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: 'f'
		},
		localize: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: 'f'
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
		icon: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		is_amenity: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: undefined
		}
	}, {
		tableName: 'property_defs', underscored: true
	});
};
