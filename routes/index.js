const express = require('express')
const router = express.Router();
const homeController = require('../controller/home.controller');
console.log('router loader');

router.get('/', homeController.home);

module.exports = router;
