const express = require('express');
const router = express.Router();
const {urlRoutes} = require('./conttroller/urlcontroller');
const verifyToken = require('../middleware/protect');

router.post('/', verifyToken,urlRoutes);
module.exports = router;