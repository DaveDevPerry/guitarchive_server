const mongoose = require('mongoose');
const Song = require('../models/songModel');
const Status = require('../models/statusModel');
('use strict');

// fastify.register(require("fastify-cors"), function (instance) {
//   return (req, callback) => {
//     const corsOptions = { origin: true };
//     callback(null, corsOptions); // callback expects two parameters: error and options
//   };
// });

// fastify.get("/healthcheck", async (request, reply) => {
//   return { up: true };
// });

// const ITEMS_PER_PAGE = 10;
const SONGS_PER_PAGE = 10;
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

// const SONGS_PER_PAGE = 10;
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
		console.log(count, 'count');
		console.log(items, 'items');
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
	console.log(request.query, 'req query');
	// Put all your query params in here
	const query = {
		'status.name': 'Practicing',
	};
	// try {
	// const skip = (page - 1) * SONGS_PER_PAGE; // 1 * 20 = 20

	// Status.find({ name: "Practicing" }).populate('Songs').exec(...)
	// Recipe.find({ title: new RegExp('\\*') }).populate('Complaints').exec(...)

	// 	Complaint.find().populate({
	// 		path: "Recipe"
	// 		match: {
	// 				title: new RegExp('\\*')
	// 		}
	// }).exec(...);
	// const filtered = Song.find();
	const filtered = Song.find()
		.populate({
			path: 'status',
			match: {
				name: 'Practicing',
			},
		})
		.exec((error, items) => {
			items.map((item) => {
				console.log(item.status, 'item');
				// return item.status !== null;
			});
		});
	// const filtered = await Song.find()
	// 	.populate({
	// 		path: 'status',
	// 		select: 'name _id',
	// 	})
	// 	.exec((error, items) => {
	// 		items.map((item) => {
	// 			console.log(item.status.name, 'item');
	// 			return item.status.name === 'Practicing';
	// 		});
	// 		console.log(items, 'items');
	// 	});
	// .forEach((song) => {
	// 	console.log(song.status.name, 'song');
	// });
	// .map((song) => {
	// 	return song.status !== null;
	// });
	// console.log(await filtered, 'filtered');
	// };
	// const getPracticing = async (request, res) => {
	// 	const page = request.query.page || 1;
	// 	console.log(request.query, 'req query');
	// 	// Put all your query params in here
	// 	const query = {
	// 		'status.name': 'Practicing',
	// 	};
	// try {
	// 	const skip = (page - 1) * SONGS_PER_PAGE; // 1 * 20 = 20
	// 	const countPromise = Song.countDocuments(query);
	// 	const itemsPromise = Song.find(query)
	// 		.populate([
	// 			{
	// 				path: 'artist',
	// 				model: 'Artist',
	// 				select: '_id name', //Fields you want to return in this populate
	// 			},
	// 			{
	// 				path: 'arranger',
	// 				model: 'Arranger',
	// 				select: '_id name', //Fields you want to return in this populate
	// 			},
	// 			{
	// 				path: 'style',
	// 				model: 'Style',
	// 				select: '_id name', //Fields you want to return in this populate
	// 			},
	// 			{
	// 				path: 'status',
	// 				model: 'Status',
	// 				select: '_id name', //Fields you want to return in this populate
	// 				// match: { 'status.name': 'Practicing' },
	// 			},
	// 		])
	// 		.limit(SONGS_PER_PAGE)
	// 		.skip(skip)
	// 		.exec((error, items) => {
	// 			items.map((item) => {
	// 				// console.log(item.status, 'item');
	// 				return item.status.name === 'Practicing';
	// 			});
	// 		});
	// 	const [count, items] = await Promise.all([countPromise, itemsPromise]);
	// 	console.log(count, 'count');
	// 	console.log(items, 'items');
	// 	const pageCount =
	// 		(count / SONGS_PER_PAGE) % 1 > 0
	// 			? Math.ceil(count / SONGS_PER_PAGE)
	// 			: count / SONGS_PER_PAGE; // 400 items / 20 = 20
	// 	res.status(200).json({
	// 		pagination: {
	// 			count,
	// 			pageCount,
	// 		},
	// 		items,
	// 	});
	// } catch (e) {
	// 	console.error(e);
	// 	return e;
	// }
};
// 	// Put all your query params in here
// 	// const query = {
// 	// 	// 'song.status.name': 'Practicing',
// 	// 	// status: { '$status.name': 'Practicing' },
// 	// 	// $eq: { 'status.name': 'Practicing' },
// 	// };
// 	// 'name': { $eq: 'Practicing' },
// 	// isFavourite: { $eq: true },
// 	// status: {
// 	// 	$filter: {
// 	// 		input: '$status',
// 	// 		as: 'status',
// 	// 		cond:
// 	// 			{ $eq: ['$status.name', 'Practicing'] },
// 	// 	},
// 	// },
// 	// 'status.name': 'Practicing'
// 	//  'status': mongoose.Schema.ObjectId(id)
// 	// };
// 	// 	"status" : {
// 	// 		"$filter" : {
// 	// 			 "input" : "$status",
// 	// 			 "as" : "status",
// 	// 			 "cond" :
// 	// 			//  { "$and" : [
// 	// 						{ "$eq" : [ "$status.name", "Practicing" ] }

// 	// 				// 		{ "$eq" : [ "$status.warehouse.code", "02" ] }
// 	// 				//  ]
// 	// 			 }
// 	// 		}
// 	//  }

// 	// let popObj = {
// 	// 	path: 'status',
// 	// 	select: 'name _id',
// 	// 	match: { name: 'Practicing' },
// 	// };
// 	// let doc = await Song.find({}).populate(popObj);
// 	// console.log(doc.length);
// 	// const filterName = 'Practicing';
// 	// const songs = await Song.find({
// 	// 	difficulty: { $gt: 4 },
// 	// });

// 	// const songs = await Song.findOne({
// 	// 	filterName,
// 	// }).populate({
// 	// 	path: 'status',
// 	// 	model: 'Status',
// 	// 	select: 'name -_id',
// 	// 	match: {
// 	// 		// 			// 'status.status.name': { $eq: filterName },
// 	// 		// 			'status.status.name': { $eq: filterName },
// 	// 		'status.name': { $eq: filterName },
// 	// 		// 			// Images: {$exists: true, $ne: []}
// 	// 		// 		},
// 	// 	},
// 	// });
// 	// const songs = await Song.find({
// 	// 	status: { $exists: true },
// 	// 	// status: { $exists: true },
// 	// })
// 	// 	.populate({
// 	// 		path: 'status',
// 	// 		model: 'Status',
// 	// 		match: {
// 	// 			// 'status.status.name': { $eq: filterName },
// 	// 			'status.status.name': { $eq: filterName },
// 	// 			// 'status.name': { $eq: filterName },
// 	// 			// Images: {$exists: true, $ne: []}
// 	// 		},
// 	// 		select: 'name -_id',
// 	// 	})
// 	// 	.exec((err, data) => {
// 	// 		console.log(err);
// 	// 		console.log(data, 'data');
// 	// 	});
// 	// const songs = await Song.find({
// 	// 	// ...someFilter,
// 	// 	status: { $exists: true },
// 	// })
// 	// 	.populate({
// 	// 		path: 'status',
// 	// 		model: 'Status',
// 	// 		match: {
// 	// 			// name: { $eq: filterName },
// 	// 			'status.status.name': { $eq: filterName },
// 	// 			// 'status.name': { $eq: filterName },
// 	// 			// Images: {$exists: true, $ne: []}
// 	// 		},
// 	// 		select: 'name -_id',
// 	// 	})
// 	// 	.exec((err, data) => {
// 	// 		console.log(err);
// 	// 		console.log(data, 'data');
// 	// 	});
// 	// .skip(skip)
// 	// .limit(limit);
// 	// .populate({
// 	// 	path: 'status',
// 	// 	match: { 'status.name': { $eq: filterName } },
// 	// 	select: 'name -_id',
// 	// })
// 	// .exec((err, data) => {
// 	// 	console.log(err);
// 	// 	res.json(data);
// 	// });

// 	// 	const products = await ProductSchema.find(
// 	// 		{
// 	// 				...someFilter,
// 	// 				"Offers.0": {$exists: true}
// 	// 		}
// 	// ).populate({
// 	// 		path: "Offers",
// 	// 		match: {
// 	// 				Quantity: {$gt: 2},
// 	// 				Images: {$exists: true, $ne: []}
// 	// 		}
// 	// }).skip(skip).limit(limit)

// 	// const songs = await Song.find({})
// 	// 	.populate({
// 	// 		path: 'status',
// 	// 		match: { 'status.name': { $eq: filterName } },
// 	// 		select: 'name -_id',
// 	// 	})
// 	// 	.exec((err, data) => {
// 	// 		console.log(err);
// 	// 		res.json(data);
// 	// 	});

// 	// const songs = await Song.find()
// 	// 	.find({ status: filterName })
// 	// 	.populate('status.name', {
// 	// 		select: 'name',
// 	// 		match: { name: { $ne: filterName } },
// 	// 	})
// 	// 	.exec(function (err, chats) {});

// 	// songs.aggregate([
// 	// 	{
// 	// 		$lookup: {
// 	// 			from: 'status',
// 	// 			localField: 'Status', // field of reference to subItem
// 	// 			foreignField: '_id',
// 	// 			as: 'status',
// 	// 		},
// 	// 	},
// 	// 	{
// 	// 		$match: {
// 	// 			$or: [{ isTab: false }, { 'status.name': { $eq: ['Practicing'] } }],
// 	// 		},
// 	// 	},
// 	// ]);

// 	// console.log(songs, 'songs');
// 	// console.log(songs.length, 'songs');
// 	// db.items.aggregate([
// 	// 	{
// 	// 		$lookup:{
// 	// 			from:"subItems",
// 	// 			localField:"subItems", // field of reference to subItem
// 	// 			foreignField:"_id",
// 	// 			as :"subItems"
// 	// 		}},
// 	// 	{
// 	// 		$match:
// 	// 				{
// 	// 					$or: [
// 	// 						{ 'owner': 1 },
// 	// 						{ 'subItems.sharedGroups.groupId': { $in: [3691] } },
// 	// 					]
// 	// 				}
// 	// 	}]
// 	// 	)

// 	// try {
// 	// 	const skip = (page - 1) * SONGS_PER_PAGE; // 1 * 20 = 20
// 	// 	const countPromise = Song.countDocuments(query);
// 	// 	const itemsPromise = Song.find(query)
// 	// 		.populate([
// 	// 			{
// 	// 				path: 'artist',
// 	// 				model: 'Artist',
// 	// 				select: '_id name', //Fields you want to return in this populate
// 	// 			},
// 	// 			{
// 	// 				path: 'arranger',
// 	// 				model: 'Arranger',
// 	// 				select: '_id name', //Fields you want to return in this populate
// 	// 			},
// 	// 			{
// 	// 				path: 'style',
// 	// 				model: 'Style',
// 	// 				select: '_id name', //Fields you want to return in this populate
// 	// 			},
// 	// 			{
// 	// 				path: 'status',
// 	// 				model: 'Status',
// 	// 				select: '_id name', //Fields you want to return in this populate
// 	// 				match: { 'status.name': 'practicing' },
// 	// 				// match: {
// 	// 				// 	'name': { $eq: 'Practicing' },
// 	// 				// 	// 'propertyLocation.city': '5fc5fe1655257c4dd4af2b16',
// 	// 				// },
// 	// 				// match: {
// 	// 				// 	name: { $eq: 'Practicing' },
// 	// 				// },
// 	// 			},
// 	// 		])
// 	// 		.limit(SONGS_PER_PAGE)
// 	// 		.skip(skip);
// 	// 	const [count, items] = await Promise.all([countPromise, itemsPromise]);
// 	// 	// console.log(items, 'items');
// 	// 	console.log(count, 'count');
// 	// 	const pageCount =
// 	// 		(count / SONGS_PER_PAGE) % 1 > 0
// 	// 			? Math.ceil(count / SONGS_PER_PAGE)
// 	// 			: count / SONGS_PER_PAGE; // 400 items / 20 = 20
// 	// 	res.status(200).json({
// 	// 		pagination: {
// 	// 			count,
// 	// 			pageCount,
// 	// 		},
// 	// 		items,
// 	// 	});
// 	// } catch (e) {
// 	// 	console.error(e);
// 	// 	return e;
// 	// }
// };

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
