const express  =  require('express');
const verifyToken = require('../middleware/protect');
const { registerUser, autho } = require('./conttroller/usercontroller');

const router = express.Router();
router.post('/',registerUser);
router.post('/login', autho);
module.exports = router;
