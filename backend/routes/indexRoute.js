const express = require('express');
const { indexRoutes } = require('./conttroller/indexcontroller');
const verifyToken = require('../middleware/protect');
const router = express.Router();

router.get('/',indexRoutes);
module.exports = router;