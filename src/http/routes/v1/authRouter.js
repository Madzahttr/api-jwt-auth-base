import { Router } from 'express';
import validationMiddleware from '../../middleware/validationMiddleware.js';
import authController from '../../controllers/v1/authController.js';

class authRouter {
	constructor() {
		this.router = Router();
		return this.init();
	}

	init() {
		const validation = new validationMiddleware();
		const auth = new authController();

		this.router.post('/register', validation.register(), auth.register);
		this.router.post('/login', validation.login(), auth.login);

		return this.router;
	}
}

export default authRouter;
