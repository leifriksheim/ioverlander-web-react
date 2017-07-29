/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('property_def_options', {
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
		hidden: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: undefined
		},
		specificity: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		sort_order: {
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
		tableName: 'property_def_options', underscored: true
	});
};
