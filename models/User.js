const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Please enter an email'],
		unique: true,
		lowercase: true,
		validate: [isEmail, 'Please enter a valid email'],
	},
	password: {
		type: String,
		required: [true, 'Please enter a password'],
		minlength: [6, 'Minimum password length is 6 characters'],
	},
});

// fire a function after doc is saved to db - 'save' or 'remove' etc
userSchema.post('save', function (doc, next) {
	console.log('new user was created & saved', doc);
	next();
});

// fire a function before doc is saved to db - hash password in here with bcrypt
userSchema.pre('save', async function (next) {
	console.log('user about to be created & saved', this);
	const salt = await bcrypt.genSalt();
	// now hash password
	this.password = await bcrypt.hash(this.password, salt);

	next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
	const user = await this.findOne({ email });
	// check for user
	if (user) {
		// compare hashed passwords using bcrypt
		const auth = await bcrypt.compare(password, user.password);
		if (auth) {
			return user;
		}
		throw Error('incorrect password');
	}
	throw Error('incorrect email');
};

const User = mongoose.model('user', userSchema);
module.exports = User;
