import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

class authMiddleware {
	constructor(req, res, next) {
		const authHeader = req.headers.authorization;

		if (authHeader) {
			const token = authHeader.split(' ')[1];

			jwt.verify(token, process.env.APP_SECRET, (err, user) => {
				if (err) return res.sendStatus(403);

				req.user = user;
				next();
			});
		} else {
			res.sendStatus(401);
		}
	}
}

export default authMiddleware;
