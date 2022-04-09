'use strict';
import { DataTypes } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
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
	userName: {
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

User.authenticate = async (username, password, callback) => {
	const user = await User.findOne({ where: { username } });
	
	if(!user) {
		callback('userNameInvalid', null);
		return;
	}

	if(bcrypt.compareSync(password, user.password)) {
		callback(null, user.authorize(user));
		return;
	}

	callback('passwordInvalid', null);
};

User.prototype.authorize = user => {
	return jwt.sign({ id: user.id }, process.env.APP_SECRET, { expiresIn: '7d' });
};

export default User;
