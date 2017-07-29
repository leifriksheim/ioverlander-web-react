/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('place_corrections', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: undefined,
			primaryKey: true
		},
		guid: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: undefined
		},
		place_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		check_in_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		},
		correction_date: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: undefined
		},
		corrections_blob: {
			type: 'blob(4096)',
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
		processed: {
			type: DataTypes.BOOLEAN,
			allowNull: true,
			defaultValue: 'f'
		},
		place_revision: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: undefined
		}
	}, {
		tableName: 'place_corrections', underscored: true
	});
};
