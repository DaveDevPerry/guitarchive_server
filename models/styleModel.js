const mongoose = require('mongoose');

const styleSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			required: true,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Style', styleSchema);
