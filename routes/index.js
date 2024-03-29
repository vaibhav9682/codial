const express = require('express')
const router = express.Router();
const homeController = require('../controller/home-controller');
console.log('router loader');

router.get('/', homeController.home);
// router.get('/homeContent', homeController.content)
//different routers

router.use('/users', require('./users'))
router.use('/post', require('./post'))
router.use('/comments', require('./comment'));
router.use('/likes', require('./likes'))


router.use('/api', require('./API'))

module.exports = router;
