/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('versions', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: undefined,
			primaryKey: true
		},
		item_type: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: undefined
		},
		item_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: undefined
		},
		event: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: undefined
		},
		whodunnit: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		object: {
			type: DataTypes.TEXT,
			allowNull: true,
			defaultValue: undefined
		},
		object_changes: {
			type: DataTypes.TEXT,
			allowNull: true,
			defaultValue: undefined
		},
		locale: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: undefined
		}
	}, {
		tableName: 'versions', underscored: true
	});
};
