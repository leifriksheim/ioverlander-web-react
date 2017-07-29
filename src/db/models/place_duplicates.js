/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('place_duplicates', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: undefined,
			primaryKey: true
		},
		parent_place_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		child_place_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		processed: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: undefined
		},
		confirmed: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: undefined
		},
		distance: {
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
		tableName: 'place_duplicates', underscored: true
	});
};
