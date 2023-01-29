require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoutes = require('./routes/user');
const songRoutes = require('./routes/songs');
const artistRoutes = require('./routes/artists');
const arrangerRoutes = require('./routes/arrangers');
const statusRoutes = require('./routes/status');
const styleRoutes = require('./routes/styles');
const productRoutes = require('./routes/products');
const ideaRoutes = require('./routes/ideas');
const requestRoutes = require('./routes/requests');

// express app
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use((req, res, next) => {
	// logs each request
	console.log(req.path, req.method, ' request logged');
	next();
});

app.use('/api/user', userRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/arrangers', arrangerRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/styles', styleRoutes);
app.use('/api/products', productRoutes);
app.use('/api/ideas', ideaRoutes);
app.use('/api/requests', requestRoutes);

// connect to db
mongoose
	.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		// listens for request once connected to db
		app.listen(process.env.PORT, () => {
			console.log(`connected to db & listening on port ${process.env.PORT}`);
		});
	})
	.catch((error) => {
		console.log(error, 'error connecting');
	});
