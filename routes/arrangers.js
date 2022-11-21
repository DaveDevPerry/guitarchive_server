const express = require('express');

const {
	getArranger,
	getArrangers,
	createArranger,
	// updateArranger,
	// deleteArranger,
	// likeArranger,
} = require('../controllers/arrangerController');

const router = express.Router();

// router.use(requireAuth);

// users route
router.get('/', getArrangers);

// GET a single todo
router.get('/:id', getArranger);

// POST a new todo
router.post('/', createArranger);
// // DELETE a todo
// router.delete('/:id', deleteArranger);
// // UPDATE a new todo
// router.patch('/:id', updateArranger);

// router.patch('/:id/likeArranger', likeArranger);

module.exports = router;
