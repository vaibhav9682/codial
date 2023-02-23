const express = require('express');
const router = express.Router();

const functions = require('../controller/function_controller');

router.get('/function', functions.fun)


module.exports = router;