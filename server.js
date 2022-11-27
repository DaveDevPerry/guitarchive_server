require('dotenv').config();

// if (process.env.NODE_ENV !== 'production') {
// 	require('dotenv').config();
// }

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// const authRoutes = require('./routes/authRoutes');
// const songRoutes = require('./routes/songRoutes');
// const cookieParser = require('cookie-parser');
// const { requireAuth, checkUser } = require('./middleware/authMiddleware');

// const app = express();
// const expressLayouts = require('express-ejs-layouts');
// const bodyParser = require('body-parser');
// const methodOverride = require('method-override');

// middleware
// app.use(express.static('public'));
// app.use(express.json());
// app.use(cookieParser());

const userRoutes = require('./routes/user');
const songRoutes = require('./routes/songs');
const artistRoutes = require('./routes/artists');
const arrangerRoutes = require('./routes/arrangers');
const statusRoutes = require('./routes/status');
const styleRoutes = require('./routes/styles');
const productRoutes = require('./routes/products');

// const indexRouter = require('./routes/index');
// const userRouter = require('./routes/users');
// const songsRouter = require('./routes/songs');

// view engine
// app.set('view engine', 'ejs');

// app.set('views', __dirname + '/views');
// app.set('layout', 'layouts/layout');
// app.use(expressLayouts);
// app.use(methodOverride('_method'));
// app.use(express.static('public'));
// app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

// app.use(bodyParser.json());

// express app
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use((req, res, next) => {
	// logs each request
	console.log(req.path, req.method, ' request logged');
	next();
});

// mongoose.connect(process.env.DATABASE_URL, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	// useCreateIndex: true,
// });

// // database connection
// const db = mongoose.connection;
// db.on('error', (error) => console.log(error));
// db.once('open', () => console.log('connected to mongoose'));

// // routes
// app.get('*', checkUser);
// app.get('/', requireAuth, indexRouter);

// app.use('/users', requireAuth, userRouter);
// app.use('/songs', requireAuth, songsRouter);
// // app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
// // app.get('/smoothies', (req, res) => res.render('smoothies'));
// // app.get('/songs', (req, res) => res.render('songs'));
// app.use(authRoutes);

// app.listen(process.env.PORT || 4000);

app.use('/api/user', userRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/arrangers', arrangerRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/styles', styleRoutes);
app.use('/api/products', productRoutes);

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

// require('dotenv').config();

// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const cors = require('cors');
// const mongoose = require('mongoose');

// // routes
// const userRoutes = require('./routes/user');
// const postRoutes = require('./routes/posts');

// // express app
// app.use(bodyParser.json({ limit: '30mb', extended: true }));
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
// app.use(cors());

// // middleware
// // looks for any request to see if it has a body and then parses it
// app.use(express.json());
// app.use((req, res, next) => {
// 	// logs each request
// 	console.log(req.path, req.method, ' request logged');
// 	next();
// });

// // routes
// app.use('/api/user', userRoutes);
// app.use('/api/posts', postRoutes);

// // connect to db
// mongoose
// 	.connect(process.env.MONGO_URI, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	})
// 	.then(() => {
// 		// listens for request once connected to db
// 		app.listen(process.env.PORT, () => {
// 			console.log(`connected to db & listening on port ${process.env.PORT}`);
// 		});
// 	})
// 	.catch((error) => {
// 		console.log(error, 'error connecting');
// 	});

// // app.get('/', (req, res) => {
// // 	res.send('hello world');
// // });
