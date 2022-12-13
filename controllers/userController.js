// const mongoose = require('mongoose');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');

// mongo uses _id for id property
const createToken = (_id) => {
	// {payload}, secret, expires
	return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

// login user
const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		// login() is the static method of user
		const user = await User.login(email, password);

		// create a token
		const token = createToken(user._id);
		console.log(token, 'new user token - user controller - login');

		const userId = user._id;
		const firstName = await user.firstName;
		const lastName = await user.lastName;
		const isAdmin = await user.isAdmin;

		res
			.status(200)
			.json({ email, token, userId, firstName, lastName, isAdmin });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// signup user
const signupUser = async (req, res) => {
	console.log(req.body, 'body');
	const { email, password, firstName, lastName } = req.body;
	try {
		// signup() is the static method of user
		const user = await User.signup(email, password, firstName, lastName);
		console.log(user, 'user signup');
		// create a token
		const token = createToken(user._id);

		res.status(200).json({ email, token });
	} catch (error) {
		console.log('error here');
		res.status(400).json({ error: error.message });
	}
};

// getUser
const getUser = async (req, res) => {
	const { id } = req.params;

	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such user' });
	}
	const user = await User.findById(id);

	if (!user) {
		return res.status(404).json({ error: 'No such user' });
	}
	res.status(200).json(user);
};

module.exports = { signupUser, loginUser, getUser };
