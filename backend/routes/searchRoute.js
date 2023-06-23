const express = require('express');
const{ searchRoutes, searchAllRoutes, updateNote} = require('./conttroller/searchcontroller');
const verifyToken = require('../middleware/protect');

const router = express.Router();


router.get('/', verifyToken,searchRoutes);
router.get('/searchAll', verifyToken,searchAllRoutes);
router.put('/update', verifyToken,updateNote);
module.exports = router;