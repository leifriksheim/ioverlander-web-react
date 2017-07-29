/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('place_bulk_imports_places', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: undefined,
			primaryKey: true
		},
		place_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		place_bulk_import_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		}
	}, {
		tableName: 'place_bulk_imports_places', underscored: true
	});
};
