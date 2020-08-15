// IMPORT MODULES
const express = require('express');
const {registerValidator,loginValidator,verifyNewUser} = require('../middlewares');
const {signupUser} = require('../controllers/auth')

// EXPRESS ROUTER
const router = express.Router();

router.post('/register',registerValidator, signupUser)

router.post('/login',loginValidator)

module.exports = router;