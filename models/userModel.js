const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const defaultYTTargets = [
	{
		targetViews: 100000,
		isComplete: false,
		dateAchieved: null,
	},
	{
		targetViews: 200000,
		isComplete: false,
		dateAchieved: null,
	},
	{
		targetViews: 500000,
		isComplete: false,
		dateAchieved: null,
	},
	{
		targetViews: 1000000,
		isComplete: false,
		dateAchieved: null,
	},
];

const allDefaultYTTargets = [
	{
		name: 'views',
		data: [
			{
				target: 50000,
				isComplete: true,
				dateAchieved: 1673657776427,
			},
			{
				target: 100000,
				isComplete: false,
				dateAchieved: null,
			},
			{
				target: 250000,
				isComplete: false,
				dateAchieved: null,
			},
			{
				target: 500000,
				isComplete: false,
				dateAchieved: null,
			},
		],
	},
	{
		name: 'subs',
		data: [
			{
				target: 100,
				isComplete: false,
				dateAchieved: null,
			},
			{
				target: 200,
				isComplete: false,
				dateAchieved: null,
			},
			{
				target: 300,
				isComplete: false,
				dateAchieved: null,
			},
			{
				target: 500,
				isComplete: false,
				dateAchieved: null,
			},
		],
	},
	{
		name: 'videos',
		data: [
			{
				target: 50,
				isComplete: true,
				dateAchieved: 1673657776427,
			},
			{
				target: 100,
				isComplete: false,
				dateAchieved: null,
			},
			{
				target: 150,
				isComplete: false,
				dateAchieved: null,
			},
			{
				target: 200,
				isComplete: false,
				dateAchieved: null,
			},
		],
	},
];

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		firstName: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			lowercase: true,
			trim: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		yTData: {
			type: [],
			default: defaultYTTargets,
			required: true,
		},
		youtubeData: {
			type: [],
			default: allDefaultYTTargets,
			required: true,
		},
		// yTData: {
		// 	type: [
		// 		{
		// 			viewTarget: {
		// 				type: Number,
		// 				required: true,
		// 				default: 100000,
		// 			},
		// 			isComplete: {
		// 				type: Boolean,
		// 				required: true,
		// 				default: false,
		// 			},
		// 			required: true,
		// 		},
		// 		{
		// 			viewTarget: {
		// 				type: Number,
		// 				required: true,
		// 				default: 200000,
		// 			},
		// 			isComplete: {
		// 				type: Boolean,
		// 				required: true,
		// 				default: false,
		// 			},
		// 			required: true,
		// 		},
		// 		{
		// 			viewTarget: {
		// 				type: Number,
		// 				required: true,
		// 				default: 500000,
		// 			},
		// 			isComplete: {
		// 				type: Boolean,
		// 				required: true,
		// 				default: false,
		// 			},
		// 			required: true,
		// 		},
		// 		{
		// 			viewTarget: {
		// 				type: Number,
		// 				required: true,
		// 				default: 1000000,
		// 			},
		// 			isComplete: {
		// 				type: Boolean,
		// 				required: true,
		// 				default: false,
		// 			},
		// 			required: true,
		// 		},
		// 	],
		// 	required: true,
		// },
		// yTData: [
		// 	{
		// 		viewTarget: {
		// 			type: Number,
		// 			required: true,
		// 			default: 100000,
		// 		},
		// 		isComplete: {
		// 			type: Boolean,
		// 			required: true,
		// 			default: false,
		// 		},
		// 	},
		// 	{
		// 		viewTarget: {
		// 			type: Number,
		// 			required: true,
		// 			default: 200000,
		// 		},
		// 		isComplete: {
		// 			type: Boolean,
		// 			required: true,
		// 			default: false,
		// 		},
		// 	},
		// ],
		// required: false,

		createdAt: {
			type: Date,
			required: true,
			default: Date.now,
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

	// console.log(user, 'user created');

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

	// console.log(user, 'user login static');
	return user;
};

module.exports = mongoose.model('User', userSchema);
