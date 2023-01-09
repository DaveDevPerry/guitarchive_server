const mongoose = require('mongoose');
// ('use strict');

const Schema = mongoose.Schema;

const songSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		artist: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'Artist',
		},
		arranger: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'Arranger',
		},
		style: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'Style',
		},
		status: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'Status',
		},
		difficulty: {
			type: Number,
			required: true,
			default: 3,
		},
		capoFret: {
			type: Number,
			required: true,
			default: 0,
		},
		isCapo: {
			type: Boolean,
			default: false,
			required: true,
		},
		isFavourite: {
			type: Boolean,
			default: false,
			required: true,
		},
		isTab: {
			type: Boolean,
			default: true,
			required: true,
		},
		notes: {
			type: String,
			required: false,
		},
		// favourite: {
		// 	type: String,
		// 	required: false,
		// },
		// pages: {
		// 	type: Number,
		// 	required: false,
		// },
		fileType: {
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
		// selectedFile: String,
		// createdAt: {
		// 	type: Date,
		// 	required: true,
		// 	default: Date.now,
		// },
		// title: String,
		// message: String,
		// creator: String,
		// tags: [String],
		selectedFile: String,
		// likeCount: {
		// 	type: Number,
		// 	default: 0,
		// },
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
songSchema.post('save', function (doc, next) {
	console.log('new song was created & saved', doc);
	next();
});

module.exports = mongoose.model('Song', songSchema);
