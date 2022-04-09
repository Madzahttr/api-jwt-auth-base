import { Router } from 'express';
import mainController from '../controllers/mainController.js';
class mainRouter {
	constructor() {
		this.router = Router();
		return this.init();
	}

	init() {
		const main = new mainController();
		this.router.get('/', main.index);
		return this.router;
	}
}

export default mainRouter;
