// const User = require('../models/User');
// const Song = require('../models/Song');
const Song = require('../models/songModel');
const mongoose = require('mongoose');
const Arranger = require('../models/Arranger');
const Status = require('../models/Status');
const Artist = require('../models/Artist');
const Style = require('../models/Style');

const getSongs = async (req, res) => {
	console.log(req.user._id, 'user id');
	try {
		const songs = await Song.find()
			// .sort({ createdAt: 1 })
			.sort({ deadlineDate: 1 })

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
		artist,
		arranger,
		style,
		status,
		difficulty,
		isFavourite,
		isTab,
		deadlineDate,
		reason,
		selectedFile,
	} = req.body;
	const user_id = req.user._id;
	console.log(user_id, 'user id - create song');
	console.log(
		selectedFile.substring(0, selectedFile.indexOf(';')),
		'selected file'
	);
	const getString = selectedFile.substring(0, selectedFile.indexOf(';'));
	const getFileType = getString.split('/')[1];

	console.log(getFileType, 'file type');

	const song = new Song({
		title,
		artist,
		arranger,
		style,
		status,
		difficulty,
		isFavourite,
		isTab,
		deadlineDate,
		reason,
		selectedFile,
		fileType: getFileType,
		user_id,
	});

	try {
		console.log('full song', song);
		const newSong = await song.save();
		res.status(201).json(newSong);
	} catch (err) {
		console.log(err);
		res.status(409).json({ message: err.message });
	}
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
	// const { id: _id } = req.params;
	const { updatedSongData } = req.body;
	console.log(updatedSongData, 'updated song data');
	// const song = req.body;
	// console.log(song, 'song in update');
	// console.log(id, 'id in update');

	if (!mongoose.Types.ObjectId.isValid(updatedSongData.songID))
		return res.status(404).send('No song with that ID!');

	const _id = updatedSongData.songID;

	const updatedSong = await Song.findByIdAndUpdate(
		updatedSongData.songID,
		{ ...updatedSongData, _id },
		{
			// title: updatedSongData.title,
			// isFavourite: updatedSongData.isFavourite,
			new: true,
		}
	);

	res.json(updatedSong);
};

const deleteSong = async (req, res) => {
	const { id } = req.params;
	// console.log(id, 'id');

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
