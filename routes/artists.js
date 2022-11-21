const express = require('express');

const {
	getArtist,
	getArtists,
	createArtist,
	// updateArtist,
	// deleteArtist,
	// likeArtist,
} = require('../controllers/artistController');

const router = express.Router();

// router.use(requireAuth);

// users route
router.get('/', getArtists);

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
