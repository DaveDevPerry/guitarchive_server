const express = require('express');

const {
	getArtist,
	getArtists,
	createArtist,
	// updateArtist,
	// deleteArtist,
	// likeArtist,
	// sortArtists,
	// sortBySongsDescending,
	// sortBySongsAscending,
} = require('../controllers/artistController');

const router = express.Router();

// router.use(requireAuth);

// users route
router.get('/', getArtists);

// router.get('/sort', sortArtists);
// router.get('/sort/songs-desc', sortBySongsDescending);
// router.get('/sort/songs-asc', sortBySongsAscending);

// GET a single todo
router.get('/:id', getArtist);

// POST a new todo
router.post('/', createArtist);
// // DELETE a todo
// router.delete('/:id', deleteArtist);
// // UPDATE a new todo
// router.patch('/:id', updateArtist);

// router.patch('/:id/likeArtist', likeArtist);

module.exports = router;
