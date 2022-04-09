import { body } from 'express-validator';
import { sequelize } from '../../models/index.js';

class validationMiddleware {
	constructor() {
		this.User = sequelize.models.User;
	}
	register() {
		return [
			body('userName')
				.notEmpty()
				.withMessage('userNameRequired')
				.bail()
				.isLength({ min: 4 })
				.withMessage('userNameLength')
				.custom(async userName => {
					return await this.User.findOne({ where: { userName } }).then(user => {
						if (user) {
							return Promise.reject('userNameTaken');
						}
					});
				}),

			body('email')
				.notEmpty()
				.withMessage('emailRequired')
				.bail()
				.isEmail()
				.withMessage('emailInvalid')
				.custom(async email => {
					return await this.User.findOne({ where: { email } }).then(user => {
						if (user) {
							return Promise.reject('emailTaken');
						}
					});
				}),

			body('password')
				.notEmpty()
				.withMessage('passwordRequired')
				.bail()
				.isLength({ min: 6 })
				.withMessage('passwordLength')
		];
	}
	login() {
		return [
			body('userName')
				.notEmpty()
				.withMessage('userNameRequired'),
			body('password')
				.notEmpty()
				.withMessage('passwordRequired'),
		];
	}
}

export default validationMiddleware;