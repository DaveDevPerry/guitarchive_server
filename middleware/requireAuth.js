const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
	// verify auth
	const { authorization } = req.headers;
	console.log(authorization, 'authorization');

	// check if header exists
	if (!authorization) {
		return res.status(401).json({ error: 'Authorization token required' });
	}

	// get token from header
	const token = authorization.split(' ')[1];
	console.log(token, 'token');

	try {
		// verify token has not been tampered with
		const { _id } = jwt.verify(token, process.env.JWT_SECRET);

		// find user in db -  select just returns that field
		req.user = await User.findOne({ _id }).select('_id');
		console.log(
			(req.user = await User.findOne({ _id }).select('_id')),
			'user require auth'
		);

		next();
	} catch (error) {
		console.log(error, 'error in requireAuth');
		res.status(401).json({ error: 'Request is not Authorized' });
	}
};

module.exports = requireAuth;
