const express = require('express');
const router = express.Router();
const Artist = require('../models/artist');

router.get('/', async (req, res) => {
	try {
		const artists = await Artist.find({});
		res.render('artists', {
			artists: artists.sort(function (a, b) {
				let nameA = a.name.toUpperCase();
				let nameB = b.name.toUpperCase();
				return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
			}),
		});
	} catch (err) {
		console.log(err);
	}
});

// array.sort(function(a,b){
//   // Turn your strings into dates, and then subtract them
//   // to get a value that is either negative, positive, or zero.
//   return new Date(b.date) - new Date(a.date);
// });

router.get('/new', (req, res) => {
	res.render('artists/new', {
		artist: new Artist(),
	});
});

router.post('/', async (req, res) => {
	const artist = new Artist({
		name: req.body.name,
	});
	try {
		const newArtist = await artist.save();
		res.redirect(`artists/${newArtist.id}`);
	} catch (err) {
		console.log(err);
	}
});

router.get('/:id', async (req, res) => {
	try {
		const genre = await Genre.findById(req.params.id);
		res.render('genres/show', {
			genre: genre,
		});
	} catch {
		res.redirect('/');
	}
});

router.get('/:id/edit', async (req, res) => {
	try {
		const genre = await Genre.findById(req.params.id);
		res.render('genres/edit', {
			genre: genre,
		});
	} catch {
		res.redirect('/genres');
	}
});

// router.put('/:id', async (req, res) => {
// 	let genre;
// 	try {
// 		genre = await Genre.findById(req.params.id);

// 		genre.name = req.body.name;

// 		await genre.save();
// 		res.redirect(`/genres`);
// 		// res.redirect(`/genres/${genre.id}`);
// 	} catch (error) {
// 		console.log(error);
// 		if (genre != null) {
// 			res.render('genres/edit', {
// 				genre: genre,
// 			});
// 		} else {
// 			res.redirect('/');
// 		}
// 	}
// });

// router.delete('/:id', async (req, res) => {
// 	let genre;
// 	try {
// 		genre = await Genre.findById(req.params.id);
// 		await genre.remove();
// 		res.redirect('/genres');
// 	} catch {
// 		if (genre != null) {
// 			res.render('genres/show', {
// 				genre: genre,
// 				errorMessage: 'could not remove genre,',
// 			});
// 		} else {
// 			res.redirect('/');
// 		}
// 	}
// });

module.exports = router;
