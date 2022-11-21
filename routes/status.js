const express = require('express');

const {
	getStatus,
	getStatuses,
	createStatus,
	// updateStatus,
	// deleteStatus,
	// likeStatus,
} = require('../controllers/statusController');

const router = express.Router();

// router.use(requireAuth);

// users route
router.get('/', getStatuses);

// GET a single todo
router.get('/:id', getStatus);

// POST a new todo
router.post('/', createStatus);
// // DELETE a todo
// router.delete('/:id', deleteStatus);
// // UPDATE a new todo
// router.patch('/:id', updateStatus);

// router.patch('/:id/likeStatus', likeStatus);

module.exports = router;
