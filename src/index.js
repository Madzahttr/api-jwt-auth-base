import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { sequelize } from './models/index.js';
const app = express();
config();
const port = process.env.PORT || 8080;

import mainRouter from './http/routes/mainRouter.js';

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	res.setHeader('X-Powered-By', 'A Small Hamster');
	next();
});

app.use('/', new mainRouter());

app.listen(port, async() => {
	try {
		await sequelize.authenticate();
		console.log('Database Connected');
	} catch (err) {
		console.error('Unable to connect to the database:', err);
		process.exit(1);
	}

	console.log(`\nApp running on port ${port}`);
});
