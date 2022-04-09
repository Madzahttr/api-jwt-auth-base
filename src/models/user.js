'use strict';
import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';
import { Model } from 'sequelize';

class User extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	// eslint-disable-next-line no-unused-vars
	static associate(models) {
	// define association here
	}
}
User.init({
	id: {
		type: DataTypes.STRING,
		primaryKey: true
	},
	username: {
		type: DataTypes.STRING
	},
	email: {
		type: DataTypes.STRING
	},
	password: {
		type: DataTypes.STRING
	}
}, {
	sequelize,
	modelName: 'User',
});

export default User;
