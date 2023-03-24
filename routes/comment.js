const express = require('express');
const router = express.Router();
const passport = require('passport')

const commentsController = require('../controller/comments_controller');

router.post('/create', passport.checkAuthentication, commentsController.create);

router.get('/delete/:id', passport.checkAuthentication, commentsController.delComment)
module.exports = router; 