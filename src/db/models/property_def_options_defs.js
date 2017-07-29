/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('property_def_options_defs', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: undefined,
			primaryKey: true
		},
		property_def_option_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: undefined
		},
		property_def_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: undefined
		}
	}, {
		tableName: 'property_def_options_defs', underscored: true
	});
};
