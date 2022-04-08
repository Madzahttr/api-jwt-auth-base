import { Router } from 'express';
import mainController from '../controllers/mainController.js';
const router = Router();

const main = new mainController();

console.log(main.index);

router.get('/', main.index.bind(main));

export default router;