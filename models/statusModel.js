const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Status', statusSchema);
