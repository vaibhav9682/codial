const express = require('express');
const router = express.Router();
const userController = require('../controller/users_controller');


router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.get('/profile', userController.profile)
router.post('/create', userController.create)
router.post('/create-session', userController.createSession)
module.exports = router;