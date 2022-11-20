// const User = require('../models/User');
// const Song = require('../models/Song');
const Song = require('../models/songModel');
const mongoose = require('mongoose');
const Arranger = require('../models/Arranger');
const Status = require('../models/Status');
const Artist = require('../models/Artist');
const Style = require('../models/Style');

const getSongs = async (req, res) => {
	try {
		const songs = await Song.find()
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
			.exec();

		res.status(200).json(songs);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

// get a single workout
const getSong = async (req, res) => {
	// const { id } = req.params;
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such song' });
	}
	const song = await Song.findById(id);
	if (!song) {
		return res.status(404).json({ error: 'No such song' });
	}
	res.status(200).json(song);
};

// const createSong = async (req, res) => {
// 	const body = req.body;

// 	const newSong = new Song(song);
// 	try {
// 		await newSong.save();

// 		res.status(201).json(newSong);
// 	} catch (error) {
// 		res.status(409).json({ message: error.message });
// 	}
// };
const createSong = async (req, res) => {
	const {
		title,
		// artist,
		// arranger,
		// style,
		// status,
		difficulty,
		isFavourite,
		deadlineDate,
		reason,
		selectedFile,
	} = req.body;
	// const user_id = req.user._id;

	// let song = new Song({
	// 	title: req.body.title,
	// 	difficulty: req.body.difficulty,
	// 	pages: req.body.pages,
	// 	format: req.body.format,
	// 	deadlineDate: req.body.deadlineDate,
	// 	reason: req.body.reason,
	// 	favourite: req.body.favourite,

	// 	// venue: req.body.venue,
	// 	// genre: req.body.genre,
	// 	// genre: if(req.body.genre[1] !== null){
	// 	// 	req.body.genre[1];
	// 	// },
	// 	// newGenre: req.body.newGenre,
	// 	// people: req.body.people,
	// 	// comments: req.body.comments,
	// });
	const song = new Song({
		title,
		// artist,
		// arranger,
		// style,
		// status,
		difficulty,
		isFavourite,
		deadlineDate,
		reason,
		selectedFile,
		// user_id,
	});

	// const checkArtists = req.body.artist;
	// let newArtist;
	// console.log(checkArtists);
	// if (checkArtists[1] !== '') {
	// 	const getNewArtist = new Artist({
	// 		name: req.body.artist[1],
	// 	});
	// 	const saveArtist = await getNewArtist.save();
	// 	newArtist = saveArtist.id;
	// } else {
	// 	newArtist = req.body.artist[0];
	// }
	// song.artist = newArtist;

	// const checkArrangers = req.body.arranger;
	// let newArranger;
	// if (checkArrangers[1] !== '') {
	// 	const getNewArranger = new Arranger({
	// 		name: req.body.arranger[1],
	// 	});
	// 	const saveArranger = await getNewArranger.save();
	// 	newArranger = saveArranger.id;
	// } else {
	// 	newArranger = req.body.arranger[0];
	// }
	// song.arranger = newArranger;

	// const checkStyles = req.body.style;
	// let newStyle;
	// console.log(checkStyles);
	// if (checkStyles[1] !== '') {
	// 	const getNewStyle = new Style({
	// 		name: req.body.style[1],
	// 	});
	// 	const saveStyle = await getNewStyle.save();
	// 	newStyle = saveStyle.id;
	// } else {
	// 	newStyle = req.body.style[0];
	// }
	// song.style = newStyle;

	// const checkStatuses = req.body.status;
	// let newStatus;
	// console.log(checkStatuses);
	// if (checkStatuses[1] !== '') {
	// 	const getNewStatus = new Status({
	// 		name: req.body.status[1],
	// 	});
	// 	const saveStatus = await getNewStatus.save();
	// 	newStatus = saveStatus.id;
	// } else {
	// 	newStatus = req.body.status[0];
	// }
	// song.status = newStatus;

	try {
		console.log('full song', song);
		const newSong = await song.save();
		// res.redirect(`songs/${newSong.id}`);
		res.status(201).json(newSong);
	} catch (err) {
		console.log(err);
		res.status(409).json({ message: error.message });
	}

	// const newSong = new Song({
	// 	title,
	// 	artist,
	// 	arranger,
	// 	style,
	// 	status,
	// 	// difficulty,
	// 	// isFavourite,
	// 	// deadlineDate,
	// 	// reason,
	// 	selectedFile,
	// 	// user_id,
	// });

	// try {
	// 	await newSong.save();

	// 	res.status(201).json(newSong);
	// } catch (error) {
	// 	res.status(409).json({ message: error.message });
	// }
};
// const createSong = async (req, res) => {
// 	const {
// 		title,
// 		artist,
// 		arranger,
// 		style,
// 		status,
// 		// difficulty,
// 		// isFavourite,
// 		// deadlineDate,
// 		// reason,
// 		selectedFile,
// 	} = req.body;
// 	// const user_id = req.user._id;

// 	const newSong = new Song({
// 		title,
// 		artist,
// 		arranger,
// 		style,
// 		status,
// 		// difficulty,
// 		// isFavourite,
// 		// deadlineDate,
// 		// reason,
// 		selectedFile,
// 		// user_id,
// 	});

// 	try {
// 		await newSong.save();

// 		res.status(201).json(newSong);
// 	} catch (error) {
// 		res.status(409).json({ message: error.message });
// 	}
// };

const updateSong = async (req, res) => {
	const { id: _id } = req.params;
	const song = req.body;

	if (!mongoose.Types.ObjectId.isValid(_id))
		return res.status(404).send('No song with that ID!');

	const updatedSong = await Song.findByIdAndUpdate(
		_id,
		{ ...song, _id },
		{
			new: true,
		}
	);

	res.json(updatedSong);
};

const deleteSong = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send('No song with that ID!');

	await Song.findByIdAndRemove(id);

	console.log('DELETE');

	res.json({ message: 'song deleted successfully' });
};

const likeSong = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).send('No song with that ID!');

	const song = await Song.findById(id);
	const updatedSong = await Song.findByIdAndUpdate(
		id,
		{ likeCount: song.likeCount + 1 },
		{ new: true }
	);

	res.json(updatedSong);
};

module.exports = {
	getSong,
	getSongs,
	createSong,
	updateSong,
	deleteSong,
	likeSong,
};

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
