const express = require('express');
const router = express.Router();
const passport = require('passport')

const postController = require('../controller/post-controller');

router.post('/create',passport.checkAuthentication, postController.createPost);
router.get('/destroy/:id', passport.checkAuthentication, postController.destroy)

module.exports = router; 