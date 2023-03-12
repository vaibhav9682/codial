const express = require('express');
const router = express.Router();

const postController = require('../controller/post-controller');

router.post('/create', postController.createPost);

module.exports = router;