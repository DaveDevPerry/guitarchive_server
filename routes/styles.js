const express = require('express');

const {
	getStyle,
	getStyles,
	createStyle,
	// updateStyle,
	// deleteStyle,
	// likeStyle,
} = require('../controllers/styleController');

const router = express.Router();

// router.use(requireAuth);

// users route
router.get('/', getStyles);

// GET a single todo
router.get('/:id', getStyle);

// POST a new todo
router.post('/', createStyle);
// // DELETE a todo
// router.delete('/:id', deleteStyle);
// // UPDATE a new todo
// router.patch('/:id', updateStyle);

// router.patch('/:id/likeStyle', likeStyle);

module.exports = router;
