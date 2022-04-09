import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { sequelize } from './models/index.js';
import Logger from './util/logger.js';

// middleware
import errorMiddleware from './http/middleware/errorMiddleware.js';

//routers
import mainRouter from './http/routes/mainRouter.js';
import authRouterv1 from './http/routes/v1/authRouter.js';

const app = express();
config();
const logger = new Logger(process.env.APP_NAME);

const appPort = process.env.APP_PORT || 8080;
const appName = process.env.APP_NAME || 'app';

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	res.setHeader('X-Powered-By', 'A Small Hamster');
	next();
});

await sequelize.authenticate().then(err => {
	if(err) {
		logger.error('Unable to connect to the database:', err);
		process.exit(1);
	}
	logger.info('Database Connected');

	app.use('/', new mainRouter());
	app.use('/v1/auth', new authRouterv1());

	const error = new errorMiddleware();

	app.use(error.notFound);
	app.use(error.serverError);
});

app.listen(appPort, () => {
	logger.info(`${appName} running on port ${appPort}`);
});
