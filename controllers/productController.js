// const User = require('../models/User');
// const Song = require('../models/Song');
// const Song = require('../models/songModel');
const mongoose = require('mongoose');
const Product = require('../models/products');

// fastify.register(require("fastify-cors"), function (instance) {
//   return (req, callback) => {
//     const corsOptions = { origin: true };
//     callback(null, corsOptions); // callback expects two parameters: error and options
//   };
// });

// fastify.get("/healthcheck", async (request, reply) => {
//   return { up: true };
// });

const ITEMS_PER_PAGE = 10;

const getProducts = async (request, res) => {
	const page = request.query.page || 1;

	// Put all your query params in here
	const query = {};

	try {
		const skip = (page - 1) * ITEMS_PER_PAGE; // 1 * 20 = 20

		const countPromise = Product.estimatedDocumentCount(query);

		const itemsPromise = Product.find(query).limit(ITEMS_PER_PAGE).skip(skip);

		const [count, items] = await Promise.all([countPromise, itemsPromise]);

		const pageCount = count / ITEMS_PER_PAGE; // 400 items / 20 = 20

		res.status(200).json({
			pagination: {
				count,
				pageCount,
			},
			items,
		});
		// return {
		// 	pagination: {
		// 		count,
		// 		pageCount,
		// 	},
		// 	items,
		// };
		// return {
		// 	pagination: {
		// 		count,
		// 		pageCount,
		// 	},
		// 	items,
		// };
	} catch (e) {
		console.error(e);
		return e;
	}
};

module.exports = {
	getProducts,
};
// fastify.get("/products", async (request, reply) => {
//   const page = request.query.page || 1;

//   // Put all your query params in here
//   const query = {};

//   try {
//     const skip = (page - 1) * ITEMS_PER_PAGE; // 1 * 20 = 20

//     const countPromise = Product.estimatedDocumentCount(query);

//     const itemsPromise = Product.find(query).limit(ITEMS_PER_PAGE).skip(skip);

//     const [count, items] = await Promise.all([countPromise, itemsPromise]);

//     const pageCount = count / ITEMS_PER_PAGE; // 400 items / 20 = 20

//     return {
//       pagination: {
//         count,
//         pageCount,
//       },
//       items,
//     };
//   } catch (e) {
//     console.error(e);
//     return e;
//   }
// });

// module.exports.songs_get = async (req, res) => {
// 	res.render('songs');
// 	const arrangers = await Arranger.find({});
// 	const statuses = await Status.find({});
// 	const songs = await Song.find({})
// 		.populate([
// 			{
// 				path: 'arranger',
// 				model: 'Arranger',
// 				select: '_id name', //Fields you want to return in this populate
// 			},
// 			{
// 				path: 'status',
// 				model: 'Status',
// 				select: '_id name', //Fields you want to return in this populate
// 			},
// 		])
// 		.exec();
// 	// const statuses = await Song.find({}).
// 	res.render('songs', {
// 		songs: songs,
// 		statuses: statuses,
// 		arrangers: arrangers,
// 	});
// 	// const arrangers = await Arranger.find({});
// 	// const statuses = await Status.find({});
// 	// const songs = await Song.find({})
// 	// 	.populate([
// 	// 		{
// 	// 			path: 'arranger',
// 	// 			model: 'Arranger',
// 	// 			select: '_id name', //Fields you want to return in this populate
// 	// 		},
// 	// 		{
// 	// 			path: 'status',
// 	// 			model: 'Status',
// 	// 			select: '_id name', //Fields you want to return in this populate
// 	// 		},
// 	// 	])
// 	// 	.exec();
// 	// // const statuses = await Song.find({}).
// 	// res.render('songs', {
// 	// 	songs: songs,
// 	// 	statuses: statuses,
// 	// 	arrangers: arrangers,
// 	// });
// };
