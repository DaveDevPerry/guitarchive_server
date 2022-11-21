const mongoose = require('mongoose');
const Style = require('../models/styleModel');

const getStyles = async (req, res) => {
	try {
		const styles = await Style.find();

		res.status(200).json(styles);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const getStyle = async (req, res) => {
	const { id } = req.params;
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such style' });
	}
	const style = await Style.findById(id);
	if (!style) {
		return res.status(404).json({ error: 'No such style' });
	}
	res.status(200).json(style);
};

const createStyle = async (req, res) => {
	const { name } = req.body;
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
	const style = new Style({
		name,
	});

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

	// const checkStyles = req.body.style;
	// let newStyle;
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
		console.log('full style', style);
		const newStyle = await style.save();
		// res.redirect(`songs/${newStyle.id}`);
		res.status(201).json(newStyle);
	} catch (err) {
		console.log(err);
		res.status(409).json({ message: error.message });
	}
};

// const updateStyle = async (req,res) => {

// }

// const deleteStyle = async (req,res) => {

// }

module.exports = {
	getStyles,
	getStyle,
	createStyle,
	// updateStyle,
	// deleteStyle
};

// const express = require('express');
// const router = express.Router();
// const Style = require('../models/style');

// router.get('/', async (req, res) => {
// 	try {
// 		const styles = await Style.find({});
// 		res.render('styles', {
// 			styles: styles.sort(function (a, b) {
// 				let nameA = a.name.toUpperCase();
// 				let nameB = b.name.toUpperCase();
// 				return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
// 			}),
// 		});
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

// // array.sort(function(a,b){
// //   // Turn your strings into dates, and then subtract them
// //   // to get a value that is either negative, positive, or zero.
// //   return new Date(b.date) - new Date(a.date);
// // });

// router.get('/new', (req, res) => {
// 	res.render('styles/new', {
// 		style: new Style(),
// 	});
// });

// router.post('/', async (req, res) => {
// 	const style = new Style({
// 		name: req.body.name,
// 	});
// 	try {
// 		const newStyle = await style.save();
// 		res.redirect(`styles/${newStyle.id}`);
// 	} catch (err) {
// 		console.log(err);
// 	}
// });

// router.get('/:id', async (req, res) => {
// 	try {
// 		const genre = await Genre.findById(req.params.id);
// 		res.render('genres/show', {
// 			genre: genre,
// 		});
// 	} catch {
// 		res.redirect('/');
// 	}
// });

// router.get('/:id/edit', async (req, res) => {
// 	try {
// 		const genre = await Genre.findById(req.params.id);
// 		res.render('genres/edit', {
// 			genre: genre,
// 		});
// 	} catch {
// 		res.redirect('/genres');
// 	}
// });

// // router.put('/:id', async (req, res) => {
// // 	let genre;
// // 	try {
// // 		genre = await Genre.findById(req.params.id);

// // 		genre.name = req.body.name;

// // 		await genre.save();
// // 		res.redirect(`/genres`);
// // 		// res.redirect(`/genres/${genre.id}`);
// // 	} catch (error) {
// // 		console.log(error);
// // 		if (genre != null) {
// // 			res.render('genres/edit', {
// // 				genre: genre,
// // 			});
// // 		} else {
// // 			res.redirect('/');
// // 		}
// // 	}
// // });

// // router.delete('/:id', async (req, res) => {
// // 	let genre;
// // 	try {
// // 		genre = await Genre.findById(req.params.id);
// // 		await genre.remove();
// // 		res.redirect('/genres');
// // 	} catch {
// // 		if (genre != null) {
// // 			res.render('genres/show', {
// // 				genre: genre,
// // 				errorMessage: 'could not remove genre,',
// // 			});
// // 		} else {
// // 			res.redirect('/');
// // 		}
// // 	}
// // });

// module.exports = router;
