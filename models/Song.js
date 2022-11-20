const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	// artist: {
	// 	type: String,
	// 	required: true,
	// },
	artist: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Artist',
	},
	arranger: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Arranger',
	},
	style: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Style',
	},
	status: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Status',
	},

	difficulty: {
		type: Number,
		required: true,
		default: 3,
	},
	favourite: {
		type: String,
		required: false,
	},
	pages: {
		type: Number,
		required: false,
	},
	format: {
		type: String,
		required: false,
	},

	deadlineDate: {
		type: Date,
		required: false,
	},
	reason: {
		type: String,
		required: false,
	},
	selectedFile: String,
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

// fire a function after doc is saved to db - 'save' or 'remove' etc
songSchema.post('save', function (doc, next) {
	console.log('new song was created & saved', doc);
	next();
});

const Song = mongoose.model('song', songSchema);
module.exports = Song;
