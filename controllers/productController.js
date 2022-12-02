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

const ITEMS_PER_PAGE = 10;
// const ITEMS_PER_PAGE = 5;
// const ITEMS_PER_PAGE = 2;

const getProducts = async (request, res) => {
	const page = request.query.page || 1;
	console.log(request.query, 'req query');
	console.log(request.params, 'req params');
	// console.log(request, 'request');

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

const SONGS_PER_PAGE = 10;
const getAllSongs = async (request, res) => {
	const page = request.query.page || 1;
	console.log(request.query, 'req query');
	console.log(request.params, 'req params');
	// console.log(request, 'request');

	// Put all your query params in here
	const query = {};
	// console.log(query, 'query');
	// const query = {
	// 	isFavourite: true,
	// };
	// console.log(query, 'query');

	try {
		const skip = (page - 1) * SONGS_PER_PAGE; // 1 * 20 = 20

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
			.limit(SONGS_PER_PAGE)
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
			(count / SONGS_PER_PAGE) % 1 > 0
				? Math.ceil(count / SONGS_PER_PAGE)
				: count / SONGS_PER_PAGE; // 400 items / 20 = 20

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
const getFavourites = async (request, res) => {
	const page = request.query.page || 1;
	console.log(request.query, 'req query');
	// Put all your query params in here
	const query = {
		isFavourite: { $eq: true },
	};
	try {
		const skip = (page - 1) * SONGS_PER_PAGE; // 1 * 20 = 20
		const countPromise = Song.countDocuments(query);
		const itemsPromise = Song.find(query)
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
			.limit(SONGS_PER_PAGE)
			.skip(skip);

		const [count, items] = await Promise.all([countPromise, itemsPromise]);

		// console.log(items, 'items');
		// console.log(count, 'count');

		const pageCount =
			(count / SONGS_PER_PAGE) % 1 > 0
				? Math.ceil(count / SONGS_PER_PAGE)
				: count / SONGS_PER_PAGE; // 400 items / 20 = 20
		res.status(200).json({
			pagination: {
				count,
				pageCount,
			},
			items,
		});
	} catch (e) {
		console.error(e);
		return e;
	}
};
const getTabs = async (request, res) => {
	const page = request.query.page || 1;
	console.log(request.query, 'req query');
	// Put all your query params in here
	const query = {
		isTab: { $eq: true },
	};
	try {
		const skip = (page - 1) * SONGS_PER_PAGE; // 1 * 20 = 20
		const countPromise = Song.countDocuments(query);
		const itemsPromise = Song.find(query)
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
			.limit(SONGS_PER_PAGE)
			.skip(skip);

		const [count, items] = await Promise.all([countPromise, itemsPromise]);

		// console.log(items, 'items');
		// console.log(count, 'count');

		const pageCount =
			(count / SONGS_PER_PAGE) % 1 > 0
				? Math.ceil(count / SONGS_PER_PAGE)
				: count / SONGS_PER_PAGE; // 400 items / 20 = 20
		res.status(200).json({
			pagination: {
				count,
				pageCount,
			},
			items,
		});
	} catch (e) {
		console.error(e);
		return e;
	}
};
const getDeadlines = async (request, res) => {
	const page = request.query.page || 1;
	console.log(request.query, 'req query');
	// Put all your query params in here
	const query = {
		deadlineDate: { $ne: null },
	};
	try {
		const skip = (page - 1) * SONGS_PER_PAGE; // 1 * 20 = 20
		const countPromise = Song.countDocuments(query);
		const itemsPromise = Song.find(query)
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
			.limit(SONGS_PER_PAGE)
			.skip(skip);

		const [count, items] = await Promise.all([countPromise, itemsPromise]);

		// console.log(items, 'items');
		// console.log(count, 'count');

		const pageCount =
			(count / SONGS_PER_PAGE) % 1 > 0
				? Math.ceil(count / SONGS_PER_PAGE)
				: count / SONGS_PER_PAGE; // 400 items / 20 = 20
		res.status(200).json({
			pagination: {
				count,
				pageCount,
			},
			items,
		});
	} catch (e) {
		console.error(e);
		return e;
	}
};
const getScores = async (request, res) => {
	const page = request.query.page || 1;
	console.log(request.query, 'req query');
	// Put all your query params in here
	const query = {
		isTab: { $eq: false },
	};
	try {
		const skip = (page - 1) * SONGS_PER_PAGE; // 1 * 20 = 20
		const countPromise = Song.countDocuments(query);
		const itemsPromise = Song.find(query)
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
			.limit(SONGS_PER_PAGE)
			.skip(skip);

		const [count, items] = await Promise.all([countPromise, itemsPromise]);

		// console.log(items, 'items');
		// console.log(count, 'count');

		const pageCount =
			(count / SONGS_PER_PAGE) % 1 > 0
				? Math.ceil(count / SONGS_PER_PAGE)
				: count / SONGS_PER_PAGE; // 400 items / 20 = 20
		res.status(200).json({
			pagination: {
				count,
				pageCount,
			},
			items,
		});
	} catch (e) {
		console.error(e);
		return e;
	}
};
const getPracticing = async (request, res) => {
	const page = request.query.page || 1;
	// Put all your query params in here
	const query = {
		isFavourite: { $eq: true },
	};
	// const query = {
	// 	'status.name': { $eq: 'Practicing' },
	// };
	// console.log(query, 'query');
	// const query = {
	// 	isFavourite: true,
	// };
	// console.log(query, 'query');

	try {
		const skip = (page - 1) * SONGS_PER_PAGE; // 1 * 20 = 20
		// const skip = (page - 1) * SONGS_PER_PAGE; // 1 * 20 = 20
		const countPromise = Song.countDocuments(query);
		// console.log(filteredCount, 'filteredCount');
		// const filteredCount = await Song.countDocuments(query);
		// console.log(filteredCount, 'filteredCount');
		// const countPromise = Song.estimatedDocumentCount(query);
		// const countPromise = Song.estimatedDocumentCount({
		// 	isFavourite: true,
		// }).populate([
		// 	{
		// 		path: 'artist',
		// 		model: 'Artist',
		// 		select: '_id name', //Fields you want to return in this populate
		// 	},
		// 	{
		// 		path: 'arranger',
		// 		model: 'Arranger',
		// 		select: '_id name', //Fields you want to return in this populate
		// 	},
		// 	{
		// 		path: 'style',
		// 		model: 'Style',
		// 		select: '_id name', //Fields you want to return in this populate
		// 	},
		// 	{
		// 		path: 'status',
		// 		model: 'Status',
		// 		select: '_id name', //Fields you want to return in this populate
		// 		// match: {
		// 		// 	name: { $eq: 'Practicing' },
		// 		// },
		// 	},
		// 	// {
		// 	// 	path: 'status.name',
		// 	// 	model: 'Status',
		// 	// 	select: '_id name', //Fields you want to return in this populate
		// 	// 	match: {
		// 	// 		name: { $eq: 'Practicing' },
		// 	// 	},
		// 	// },
		// ]);

		// const filteredSongs = await Song.find(query)
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
		// 	// .filter((song) => {
		// 	// 	return song.status.name === 'Practicing';
		// 	// })
		// 	.limit(SONGS_PER_PAGE)
		// 	.skip(skip);
		// // console.log(filteredSongs, 'filters');

		// const getPracticeSongs = [...filteredSongs].filter((song) => {
		// 	return song.status.name === 'Practicing';
		// });

		// console.log(getPracticeSongs, 'get practice songs');

		const itemsPromise = Song.find(query)
			// .where({
			// 	'status.name': { $eq: 'Practicing' },
			// })
			// .aggregate(
			// 	[
			// 		{ $match: { 'status.name': 'Practicing' } },
			// 		{
			// 			$project: {
			// 				// "orderdate": 1,
			// 				status: {
			// 					$filter: {
			// 						input: '$status',
			// 						as: 'status',
			// 						cond: {
			// 							$gte: ['$$status.name', 'Practicing'],
			// 						},
			// 					},
			// 				},
			// 				__v: 1,
			// 			},
			// 		},
			// 	],
			// 	function (err, orders) {
			// 		Song.populate(
			// 			songs.map(function (song) {
			// 				return new Song(song);
			// 			}),
			// 			{
			// 				path: 'status.name',
			// 				match: {
			// 					name: 'Practicing',
			// 					// { "$lte": "Practicing" }
			// 				},
			// 			},
			// 			function (err, orders) {
			// 				// now it's all populated and mongoose documents
			// 			}
			// 		);
			// 	}
			// )
			// 		.find({ "status.name": "Practicing"
			// 		{ "$gte": "Practicing" }
			// 	 })
			// 	  .select({ "status.$": 1 })
			// 	.populate({
			// 		path: 'status.name',
			// 		match: {
			// 			name: 'Practicing',
			// 			//  { "$lte": 500 }
			// 		},
			// 		select: '_id name',
			// 		model: 'Status',
			// 	})
			// .exec(function (err, orders) {
			// 	// populated and filtered twice
			// })
			// 		.find({
			// 			age: { $in:[ 28, 1] },
			// 	},(err,res)=>{
			// 	console.log(res)
			// })
			// .filter((obj) => obj.status.name === 'Practicing')
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
					// match: {
					// 	name: { $eq: 'Practicing' },
					// },
				},
				// {
				// 	path: 'status.name',
				// 	model: 'Status',
				// 	select: '_id name', //Fields you want to return in this populate
				// 	match: {
				// 		name: { $eq: 'Practicing' },
				// 	},
				// },
			])

			.limit(SONGS_PER_PAGE)
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

		// const clonedItems = itemsPromise;
		// console.log(clonedItems, 'cloned items');
		// console.log(itemsPromise, 'items');

		// const [count, items] = await Promise.all([countPromise, getPracticeSongs]);
		const [count, items] = await Promise.all([countPromise, itemsPromise]);

		// console.log(items, 'items');
		console.log(count, 'count');

		// const pageCount = count / ITEMS_PER_PAGE; // 400 items / 20 = 20
		const pageCount =
			(count / SONGS_PER_PAGE) % 1 > 0
				? Math.ceil(count / SONGS_PER_PAGE)
				: count / SONGS_PER_PAGE; // 400 items / 20 = 20
		// const pageCount =
		// 	(count / ITEMS_PER_PAGE) % 1 > 0
		// 		? Math.ceil(count / ITEMS_PER_PAGE)
		// 		: count / ITEMS_PER_PAGE; // 400 items / 20 = 20

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
	getAllSongs,
	getProducts,
	getPracticing,
	getFavourites,
	getTabs,
	getScores,
	getDeadlines,
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
