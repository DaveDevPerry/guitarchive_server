const mongoose = require('mongoose');
const Arranger = require('../models/arrangerModel');

const getArrangers = async (req, res) => {
	try {
		const arrangers = await Arranger.find().sort({
			name: 1,
		});
		// const arrangers = await Arranger.find();

		res.status(200).json(arrangers);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const getArranger = async (req, res) => {
	const { id } = req.params;
	// check if id exists
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: 'No such arranger' });
	}
	const arranger = await Arranger.findById(id);
	if (!arranger) {
		return res.status(404).json({ error: 'No such arranger' });
	}
	res.status(200).json(arranger);
};

const createArranger = async (req, res) => {
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
	const arranger = new Arranger({
		name,
	});

	// const checkArrangers = req.body.arranger;
	// let newArranger;
	// console.log(checkArrangers);
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
		console.log('full arranger', arranger);
		const newArranger = await arranger.save();
		// res.redirect(`songs/${newArranger.id}`);
		res.status(201).json(newArranger);
	} catch (err) {
		console.log(err);
		res.status(409).json({ message: err.message });
	}
};

// const updateArranger = async (req,res) => {

// }

// const deleteArranger = async (req,res) => {

// }

module.exports = {
	getArrangers,
	getArranger,
	createArranger,
	// updateArranger,
	// deleteArranger
};

// const express = require('express');
// const router = express.Router();
// const Arranger = require('../models/arranger');

// router.get('/', async (req, res) => {
// 	try {
// 		const arrangers = await Arranger.find({});
// 		res.render('arrangers', {
// 			arrangers: arrangers.sort(function (a, b) {
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
// 	res.render('arrangers/new', {
// 		arranger: new Arranger(),
// 	});
// });

// router.post('/', async (req, res) => {
// 	const arranger = new Arranger({
// 		name: req.body.name,
// 	});
// 	try {
// 		const newArranger = await arranger.save();
// 		res.redirect(`arrangers/${newArranger.id}`);
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
