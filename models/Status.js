const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Status', statusSchema);
