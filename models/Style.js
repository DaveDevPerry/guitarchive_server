const mongoose = require('mongoose');

const styleSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

module.exports = mongoose.model('Style', styleSchema);
