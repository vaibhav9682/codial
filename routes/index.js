const express = require('express')
const router = express.Router();
const homeController = require('../controller/home.controller');
console.log('router loader');

router.get('/', homeController.home);

//different routers

router.use('/users', require('./users'))
router.use('/Userfun', require('./function'))
router.use('/media', require('./vedio'))
module.exports = router;
