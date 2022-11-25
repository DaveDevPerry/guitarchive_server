const express = require('express');

const {
	getSong,
	getSongs,
	createSong,
	updateSong,
	deleteSong,
	likeSong,
} = require('../controllers/songController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

// users route
router.get('/', getSongs);

// GET a single todo
router.get('/:id', getSong);

// POST a new todo
router.post('/', createSong);
// DELETE a todo
router.delete('/:id', deleteSong);
// UPDATE a new todo
router.patch('/:id', updateSong);

router.patch('/:id/likeSong', likeSong);

// router.get('/', getSongs);
// router.song('/', createSong);
// router.patch('/:id', updateSong);
// router.delete('/:id', deleteSong);
// router.patch('/:id/likeSong', likeSong);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const Song = require('../models/Song');
// const Status = require('../models/Status');
// const Arranger = require('../models/Arranger');
// const Artist = require('../models/Artist');
// const Style = require('../models/Style');
// // const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
// // const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

// router.get('/', async (req, res) => {
// 	const user = await User.findById(res.locals.user.id);
// 	const users = await User.find({});
// 	const songs = await Song.find({})
// 		.populate([
// 			{
// 				path: 'artist',
// 				model: 'Artist',
// 				select: '_id name', //Fields you want to return in this populate
// 			},
// 			{
// 				path: 'arranger',
// 				model: 'Arranger',
// 				select: '_id name',
// 			},
// 			{
// 				path: 'style',
// 				model: 'Style',
// 				select: '_id name',
// 			},
// 			{
// 				path: 'status',
// 				model: 'Status',
// 				select: '_id name',
// 			},
// 		])
// 		.exec();
// 	try {
// 		res.render('songs/index', {
// 			user: user,
// 			users: users,
// 			songs: songs,
// 		});
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

// // new song route
// router.get('/new', async (req, res) => {
// 	console.log('current user? ', res.locals.user.id);

// 	try {
// 		const artists = await Artist.find({});
// 		const arrangers = await Arranger.find({});
// 		const statuses = await Status.find({});
// 		const styles = await Style.find({});
// 		const params = {
// 			artists: artists.sort(function (a, b) {
// 				let nameA = a.name.toUpperCase();
// 				let nameB = b.name.toUpperCase();
// 				return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
// 			}),
// 			arrangers: arrangers.sort(function (a, b) {
// 				let nameA = a.name.toUpperCase();
// 				let nameB = b.name.toUpperCase();
// 				return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
// 			}),
// 			statuses: statuses.sort(function (a, b) {
// 				let nameA = a.name.toUpperCase();
// 				let nameB = b.name.toUpperCase();
// 				return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
// 			}),
// 			styles: styles.sort(function (a, b) {
// 				let nameA = a.name.toUpperCase();
// 				let nameB = b.name.toUpperCase();
// 				return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
// 			}),
// 			song: new Song(),
// 		};
// 		res.render('songs/new', params);
// 	} catch (error) {
// 		res.redirect('/songs');
// 	}
// 	// console.log('current user? ', res.locals.user);
// 	// res.render('songs/new', { song: new Song() });
// });

// router.song('/', async (req, res) => {
// 	let song = new Song({
// 		title: req.body.title,
// 		difficulty: req.body.difficulty,
// 		pages: req.body.pages,
// 		format: req.body.format,
// 		deadlineDate: req.body.deadlineDate,
// 		reason: req.body.reason,
// 		favourite: req.body.favourite,

// 		// venue: req.body.venue,
// 		// genre: req.body.genre,
// 		// genre: if(req.body.genre[1] !== null){
// 		// 	req.body.genre[1];
// 		// },
// 		// newGenre: req.body.newGenre,
// 		// people: req.body.people,
// 		// comments: req.body.comments,
// 	});

// 	const checkArtists = req.body.artist;
// 	let newArtist;
// 	console.log(checkArtists);
// 	if (checkArtists[1] !== '') {
// 		const getNewArtist = new Artist({
// 			name: req.body.artist[1],
// 		});
// 		const saveArtist = await getNewArtist.save();
// 		newArtist = saveArtist.id;
// 	} else {
// 		newArtist = req.body.artist[0];
// 	}
// 	song.artist = newArtist;

// 	const checkArrangers = req.body.arranger;
// 	let newArranger;
// 	if (checkArrangers[1] !== '') {
// 		const getNewArranger = new Arranger({
// 			name: req.body.arranger[1],
// 		});
// 		const saveArranger = await getNewArranger.save();
// 		newArranger = saveArranger.id;
// 	} else {
// 		newArranger = req.body.arranger[0];
// 	}
// 	song.arranger = newArranger;

// 	const checkStyles = req.body.style;
// 	let newStyle;
// 	console.log(checkStyles);
// 	if (checkStyles[1] !== '') {
// 		const getNewStyle = new Style({
// 			name: req.body.style[1],
// 		});
// 		const saveStyle = await getNewStyle.save();
// 		newStyle = saveStyle.id;
// 	} else {
// 		newStyle = req.body.style[0];
// 	}
// 	song.style = newStyle;

// 	const checkStatuses = req.body.status;
// 	let newStatus;
// 	console.log(checkStatuses);
// 	if (checkStatuses[1] !== '') {
// 		const getNewStatus = new Status({
// 			name: req.body.status[1],
// 		});
// 		const saveStatus = await getNewStatus.save();
// 		newStatus = saveStatus.id;
// 	} else {
// 		newStatus = req.body.status[0];
// 	}
// 	song.status = newStatus;

// 	try {
// 		console.log('full song', song);
// 		const newSong = await song.save();
// 		res.redirect(`songs/${newSong.id}`);
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

// router.get('/:id', async (req, res) => {
// 	try {
// 		const song = await Song.findById(req.params.id)
// 			.populate([
// 				{
// 					path: 'artist',
// 					model: 'Artist',
// 					select: '_id name', //Fields you want to return in this populate
// 				},
// 				{
// 					path: 'arranger',
// 					model: 'Arranger',
// 					select: '_id name',
// 				},
// 				{
// 					path: 'style',
// 					model: 'Style',
// 					select: '_id name',
// 				},
// 				{
// 					path: 'status',
// 					model: 'Status',
// 					select: '_id name',
// 				},
// 			])
// 			.exec();
// 		res.render('songs/show', {
// 			song: song,
// 		});
// 	} catch {
// 		res.redirect('/');
// 	}
// });

// router.get('/:id/edit', async (req, res) => {
// 	try {
// 		const song = await Song.findById(req.params.id)
// 			.populate([
// 				{
// 					path: 'artist',
// 					model: 'Artist',
// 					select: '_id name', //Fields you want to return in this populate
// 				},
// 				{
// 					path: 'arranger',
// 					model: 'Arranger',
// 					select: '_id name',
// 				},
// 				{
// 					path: 'style',
// 					model: 'Style',
// 					select: '_id name',
// 				},
// 				{
// 					path: 'status',
// 					model: 'Status',
// 					select: '_id name',
// 				},
// 			])
// 			.exec();

// 		const artists = await Artist.find({});
// 		const arrangers = await Arranger.find({});
// 		const statuses = await Status.find({});
// 		const styles = await Style.find({});

// 		res.render('songs/edit', {
// 			song: song,
// 			artists: artists.sort(function (a, b) {
// 				let nameA = a.name.toUpperCase();
// 				let nameB = b.name.toUpperCase();
// 				return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
// 			}),
// 			arrangers: arrangers.sort(function (a, b) {
// 				let nameA = a.name.toUpperCase();
// 				let nameB = b.name.toUpperCase();
// 				return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
// 			}),
// 			styles: styles.sort(function (a, b) {
// 				let nameA = a.name.toUpperCase();
// 				let nameB = b.name.toUpperCase();
// 				return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
// 			}),
// 			statuses: statuses.sort(function (a, b) {
// 				let nameA = a.name.toUpperCase();
// 				let nameB = b.name.toUpperCase();
// 				return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
// 			}),
// 		});
// 	} catch {
// 		res.redirect('/songs');
// 	}
// });

// router.put('/:id', async (req, res) => {
// 	let song;
// 	try {
// 		song = await Song.findById(req.params.id);
// 		song.title = req.body.title;
// 		song.difficulty = req.body.difficulty;
// 		song.pages = req.body.pages;
// 		song.format = req.body.format;
// 		song.deadlineDate = req.body.deadlineDate;
// 		song.reason = req.body.reason;
// 		song.favourite = req.body.favourite;
// 		// song.artist = req.body.artist;
// 		// song.arranger = req.body.arranger;
// 		// song.status = req.body.status;
// 		// song.style = req.body.style;
// 		await song.save();
// 		res.redirect(`/`);
// 		// res.redirect(`/songs/${song.id}`);
// 	} catch (error) {
// 		console.log(error);
// 		if (song != null) {
// 			res.render('songs/edit', {
// 				song: song,
// 			});
// 		} else {
// 			res.redirect('/');
// 		}
// 	}
// });

// router.delete('/:id', async (req, res) => {
// 	let song;
// 	try {
// 		song = await Song.findById(req.params.id);
// 		await song.remove();
// 		res.redirect('/songs');
// 	} catch {
// 		if (song != null) {
// 			res.render('songs/show', {
// 				song: song,
// 				errorMessage: 'could not remove song,',
// 			});
// 		} else {
// 			res.redirect('/');
// 		}
// 	}
// });

// router.get('/', async (req, res) => {
// 	const user = await User.find({});
// 	try {
// 		res.render('users/index', {
// 			user: user,
// 		});
// 	} catch (err) {
// 		console.log(err);
// 	}
// 	res.render('users/index');
// });

// router.get('/:id', async (req, res) => {
// 	try {
// 		// const user = await User.findById(req.params.id);
// 		// const allChildren = await Person.find({});
// 		// const people = await Person.find({});

// 		// console.log('children of', children.children);
// 		const user = await User.findById(req.params.id)
// 			.populate([
// 				{
// 					path: 'songsCreated',
// 					model: 'Song',
// 					select: '_id title',
// 				},
// 			])
// 			.exec();

// 		res.render('users/show', {
// 			user: user,
// 		});
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

// edit user
// router.get('/:id/edit', async (req, res) => {
// 	try {
// 		const user = await User.findById(req.params.id);
// 		res.render('users/edit', {
// 			user: user,
// 		});
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

// router.put('/:id', async (req, res) => {
// 	try {
// 		const user = await User.findByIdAndUpdate(req.params.id, {
// 			username: req.body.username,
// 		});

// 		console.log('user with username? ', user);
// 		res.redirect(`${user.id}`);
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

// update user - works but hashes password again
// router.put('/:id', async (req, res) => {
// 	let user;
// 	try {
// 		user = await User.findById(req.params.id);
// 		user.username = req.body.username;
// 		if (req.body.cover != null && req.body.cover !== '') {
// 			saveCover(user, req.body.cover);
// 		}
// 		await user.save();
// 		res.redirect(`/users/${user.id}`);
// 	} catch (err) {
// 		console.log(err);
// 		if (user == null) {
// 			res.redirect('/');
// 		} else {
// 			res.render('users/edit', {
// 				user: user,
// 				errorMessage: 'error updating user',
// 			});
// 		}
// 	}
// });

// update user - works
// router.put('/:id', async (req, res) => {
// 	let user;
// 	try {
// 		user = await User.findByIdAndUpdate(req.params.id);
// 		user.username = req.body.username;
// 		if (req.body.cover != null && req.body.cover !== '') {
// 			saveCover(user, req.body.cover);
// 		}
// 		await user.save();
// 		res.redirect(`/users/${user.id}`);
// 	} catch (err) {
// 		console.log(err);
// 		if (user == null) {
// 			res.redirect('/');
// 		} else {
// 			res.render('users/edit', {
// 				user: user,
// 				errorMessage: 'error updating user',
// 			});
// 		}
// 	}
// });

// update user
// router.put('/:id', async (req, res) => {
// 	let user;
// 	try {
// 		user = await User.findById(req.params.id);

// 		user.username = req.body.username;
// 		user.email = req.body.email;
// 		// user.phoneNbr = req.body.phoneNbr;
// 		// user.notifications = req.body.notifications;
// 		// if (req.body.cover != null && req.body.cover !== '') {
// 		// 	saveCover(user, req.body.cover);
// 		// }
// 		await user.save();
// 		res.redirect(`/users/${user.id}`);
// 	} catch (err) {
// 		console.log(err);
// 		if (user == null) {
// 			res.redirect('/songs');
// 		} else {
// 			res.render('users/edit', {
// 				user: user,
// 				errorMessage: 'error updating user',
// 			});
// 		}
// 	}
// });

// function saveCover(user, coverEncoded) {
// 	if (coverEncoded == null) return;
// 	const cover = JSON.parse(coverEncoded);
// 	if (cover != null && imageMimeTypes.includes(cover.type)) {
// 		user.coverImage = new Buffer.from(cover.data, 'base64');
// 		user.coverImageType = cover.type;
// 	}
// }
// function saveCover(user, coverEncoded) {
// 	if (coverEncoded == null) return;
// 	const cover = JSON.parse(coverEncoded);
// 	if (cover != null && imageMimeTypes.includes(cover.type)) {
// 		user.coverImage = new Buffer.from(cover.data, 'base64');
// 		user.coverImageType = cover.type;
// 	}
// }

module.exports = router;
