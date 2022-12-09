const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		createdAt: {
			type: Date,
			required: true,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Artist', artistSchema);
