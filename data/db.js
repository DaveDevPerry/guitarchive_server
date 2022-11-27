const mongoose = require('mongoose');

async function connect() {
	try {
		// mongoose.connect(`${process.env.DATABASE_URL}`);
		// mongoose.connect('mongodb://localhost:27017/paginationtest');
		mongoose.connect(
			'mongodb+srv://dbDave:JZunjERkZtyVdQxB@cluster0.tzlqe.mongodb.net/guitarchive_v3'
		);
		console.log('Connected to DB');
	} catch (e) {
		console.error('Could not connect to DB');
		process.exit(1);
	}
}

async function disconnect() {
	await mongoose.connection.close();
	return;
}

module.exports = { connect, disconnect };
