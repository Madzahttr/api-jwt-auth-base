import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { sequelize } from '../../../models/index.js';
import Snowflake from '../../../util/snowflake.js';
import Logger from '../../../util/logger.js';

// eslint-disable-next-line no-unused-vars
const logger = new Logger('controller');

class authController {
	async register(req, res) {
		const User = sequelize.models.User;
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			let err = {};
			for(let error of errors.array()) err[error.msg] = true;
			
			return res.status(400).json({
				error: true,
				body: err
			});
		}

		let { userName, email, password } = req.body;
		password = bcrypt.hashSync(password, 10);

		let user = await User.create({
			id: new Snowflake(userName).generate(),
			userName: userName,
			email: email,
			password: password
		});

		return res.json({
			error: false,
			body: await user.authorize(user)
		});
	}
	login(req, res) {
		const User = sequelize.models.User;
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			let err = {};
			for(let error of errors.array()) err[error.msg] = true;
			
			return res.status(400).json({
				error: true,
				body: err
			});
		}

		const { userName, password } = req.body;

		User.authenticate(userName, password, (error, accessToken) => {
			if(error) {
				switch(error) {
				case 'passwordInvalid':
					return res.status(400).json({
						error: true,
						body: {
							passwordInvalid: true
						}
					});
				case 'userNameInvalid':
					return res.status(400).json({
						error: true,
						body: {
							userNameInvalid: true
						}
					});
				default:
					logger.error(error);
					
					return res.status(500).json({
						error: true,
						body: 'server error'
					});
				}
			}
	
			return res.json({
				error: false,
				body: accessToken
			});
		});
	}
}

export default authController;
