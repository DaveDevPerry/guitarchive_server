const express = require('express');

// Controller functions
const {
	signupUser,
	loginUser,
	getUser,
} = require('../controllers/userController');
// const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// router.use(requireAuth);
// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// get user route
router.get('/:id', getUser);

module.exports = router;
