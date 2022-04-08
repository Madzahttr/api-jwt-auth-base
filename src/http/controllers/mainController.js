class mainController {
	index(req, res) {
		return res.json({
			error: false,
			body: 'Hello, World'
		});
	}
}

export default mainController;