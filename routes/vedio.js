const express = require('express');
const router = express.Router();
const vedioController = require('../controller/video_controller');

router.get('/vedio' , vedioController.vedio);




module.exports = router;