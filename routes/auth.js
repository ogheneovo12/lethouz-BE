// IMPORT MODULES
const express = require('express');
const {registerValidator,loginValidator,verifyNewUser} = require('../middlewares');

// EXPRESS ROUTER
const router = express.Router();

router.post('/register',registerValidator,verifyNewUser,(req,res) => {
  res.send('successful');
})

router.post('/login',loginValidator,(req,res) => {
  res.send('successful');
})

module.exports = router;