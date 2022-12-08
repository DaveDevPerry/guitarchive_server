const mongoose = require('mongoose');
// ('use strict');

const Schema = mongoose.Schema;

const ideaSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		artist: {
			type: String,
			required: false,
			trim: true,
			lowercase: true,
		},
		style: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
		},
		notes: {
			type: String,
			trim: true,
			lowercase: true,
		},
		isComplete: {
			type: Boolean,
			default: false,
			required: true,
		},
		createdAt: {
			type: Date,
			default: new Date(),
		},
		user_id: {
			type: String,
			// required: true,
		},
	},
	{ timestamps: true }
);

// fire a function after doc is saved to db - 'save' or 'remove' etc
ideaSchema.post('save', function (doc, next) {
	console.log('new song was created & saved', doc);
	next();
});

module.exports = mongoose.model('Idea', ideaSchema);
