const mongoose = require('mongoose');
const Song = require('../models/songModel');

// fastify.register(require("fastify-cors"), function (instance) {
//   return (req, callback) => {
//     const corsOptions = { origin: true };
//     callback(null, corsOptions); // callback expects two parameters: error and options
//   };
// });

// fastify.get("/healthcheck", async (request, reply) => {
//   return { up: true };
// });

const ITEMS_PER_PAGE = 5;
// const ITEMS_PER_PAGE = 2;

const getProducts = async (request, res) => {
	const page = request.query.page || 1;
	console.log(request.query, 'req query');

	// Put all your query params in here
	const query = {};
	// console.log(query, 'query');
	// const query = {
	// 	isFavourite: true,
	// };
	// console.log(query, 'query');

	try {
		const skip = (page - 1) * ITEMS_PER_PAGE; // 1 * 20 = 20

		const countPromise = Song.estimatedDocumentCount(query);

		const itemsPromise = Song.find(query)
			// .sort({ deadlineDate: 1 })
			// .sort({ deadlineDate: null })
			.populate([
				{
					path: 'artist',
					model: 'Artist',
					select: '_id name', //Fields you want to return in this populate
				},
				{
					path: 'arranger',
					model: 'Arranger',
					select: '_id name', //Fields you want to return in this populate
				},
				{
					path: 'style',
					model: 'Style',
					select: '_id name', //Fields you want to return in this populate
				},
				{
					path: 'status',
					model: 'Status',
					select: '_id name', //Fields you want to return in this populate
				},
			])
			.limit(ITEMS_PER_PAGE)
			.skip(skip);
		// const itemsPromise = Song.find(query).limit(ITEMS_PER_PAGE).skip(skip);

		// const songsPromise = Song.find()
		// 	// .sort({ createdAt: 1 })
		// 	.sort({ deadlineDate: 1 })

		// 	.populate([
		// 		{
		// 			path: 'artist',
		// 			model: 'Artist',
		// 			select: '_id name', //Fields you want to return in this populate
		// 		},
		// 		{
		// 			path: 'arranger',
		// 			model: 'Arranger',
		// 			select: '_id name', //Fields you want to return in this populate
		// 		},
		// 		{
		// 			path: 'style',
		// 			model: 'Style',
		// 			select: '_id name', //Fields you want to return in this populate
		// 		},
		// 		{
		// 			path: 'status',
		// 			model: 'Status',
		// 			select: '_id name', //Fields you want to return in this populate
		// 		},
		// 	])
		// 	.exec();

		const [count, items] = await Promise.all([countPromise, itemsPromise]);

		// const pageCount = count / ITEMS_PER_PAGE; // 400 items / 20 = 20
		const pageCount =
			(count / ITEMS_PER_PAGE) % 1 > 0
				? Math.ceil(count / ITEMS_PER_PAGE)
				: count / ITEMS_PER_PAGE; // 400 items / 20 = 20

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
// const mongoose = require('mongoose');
// const Product = require('../models/products');

// // fastify.register(require("fastify-cors"), function (instance) {
// //   return (req, callback) => {
// //     const corsOptions = { origin: true };
// //     callback(null, corsOptions); // callback expects two parameters: error and options
// //   };
// // });

// // fastify.get("/healthcheck", async (request, reply) => {
// //   return { up: true };
// // });

// const ITEMS_PER_PAGE = 10;

// const getProducts = async (request, res) => {
// 	const page = request.query.page || 1;

// 	// Put all your query params in here
// 	const query = {};

// 	try {
// 		const skip = (page - 1) * ITEMS_PER_PAGE; // 1 * 20 = 20

// 		const countPromise = Product.estimatedDocumentCount(query);

// 		const itemsPromise = Product.find(query).limit(ITEMS_PER_PAGE).skip(skip);

// 		const [count, items] = await Promise.all([countPromise, itemsPromise]);

// 		const pageCount = count / ITEMS_PER_PAGE; // 400 items / 20 = 20

// 		res.status(200).json({
// 			pagination: {
// 				count,
// 				pageCount,
// 			},
// 			items,
// 		});
// 		// return {
// 		// 	pagination: {
// 		// 		count,
// 		// 		pageCount,
// 		// 	},
// 		// 	items,
// 		// };
// 		// return {
// 		// 	pagination: {
// 		// 		count,
// 		// 		pageCount,
// 		// 	},
// 		// 	items,
// 		// };
// 	} catch (e) {
// 		console.error(e);
// 		return e;
// 	}
// };

// module.exports = {
// 	getProducts,
// };
