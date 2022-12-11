const express = require('express');

const {
	getRequest,
	getRequests,
	createRequest,
	updateRequest,
	deleteRequest,
} = require('../controllers/requestController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

// users route
router.get('/', getRequests);

// GET a single todo
router.get('/:id', getRequest);

// POST a new todo
router.post('/', createRequest);
// DELETE a todo
router.delete('/:id', deleteRequest);
// UPDATE a new todo
router.patch('/:id', updateRequest);

module.exports = router;
