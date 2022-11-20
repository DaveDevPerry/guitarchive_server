const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

// @note don't use arrow functions if using this keyword
userSchema.statics.signup = async function (
	email,
	password,
	firstName,
	lastName
) {
	console.log('signup static');
	// validation
	if (!email || !password || !firstName || !lastName) {
		throw Error('All fields must be filled');
	}
	// is valid email
	if (!validator.isEmail(email)) {
		throw Error('Email is not valid');
	}
	// is password strong enough
	if (!validator.isStrongPassword(password)) {
		throw Error('Password not strong enough');
	}

	// 'this' - refers to user
	const exists = await this.findOne({ email });

	if (exists) {
		throw Error('Email already in use');
	}

	// save user
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	const user = await this.create({
		email,
		password: hash,
		firstName,
		lastName,
	});

	console.log(user, 'user created');

	return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
	// check fields are filled
	if (!email || !password) {
		throw Error('All fields must be filled');
	}

	// 'this' refers to user
	const user = await this.findOne({ email });
	// does user exist?
	if (!user) {
		throw Error('incorrect email');
	}
	// password if from body
	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		throw Error('Incorrect password');
	}

	console.log(user, 'user login static');
	return user;
};

module.exports = mongoose.model('User', userSchema);
