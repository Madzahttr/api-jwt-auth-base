class errorMiddleware {
	// eslint-disable-next-line no-unused-vars
	notFound(req, res, next) {
		res.status(404).json({ 
			error: true,
			body: 'not found' 
		});
		next();
	}

	// eslint-disable-next-line no-unused-vars
	serverError(err, req, res, next) {
		switch(err.statusCode) {
		case 400:
			res.status(400).json({ 
				error: true,
				body: err.type 
			});
			break;
		case 500:
			res.status(500).json({ 
				error: true,
				body: err.type 
			});
		}
	}
}

export default errorMiddleware;
