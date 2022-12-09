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

module.exports = router;
