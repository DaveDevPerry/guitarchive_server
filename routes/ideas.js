const express = require('express');

const {
	getIdea,
	getIdeas,
	createIdea,
	updateIdea,
	deleteIdea,
} = require('../controllers/ideaController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

// users route
router.get('/', getIdeas);

// GET a single todo
router.get('/:id', getIdea);

// POST a new todo
router.post('/', createIdea);
// DELETE a todo
router.delete('/:id', deleteIdea);
// UPDATE a new todo
router.patch('/:id', updateIdea);

module.exports = router;
