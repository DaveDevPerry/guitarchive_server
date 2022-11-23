const mongoose = require('mongoose');

const arrangerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		createdAt: {
			type: Date,
			required: true,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Arranger', arrangerSchema);
