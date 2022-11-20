const { Router } = require('express');
const songController = require('../controllers/songController');

const router = Router();

router.get('/songs', songController.songs_get);
// router.post('/songs', songController.songs_post);
// router.get('/login', songController.login_get);
// router.post('/login', songController.login_post);
// router.get('/logout', songController.logout_get);

module.exports = router;
