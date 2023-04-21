const express = require('express')
const router = express.Router();
const userApi = require('../../../controller/API/V1/user_api')



router.use('/create-session', userApi.createSession);

module.exports = router;
