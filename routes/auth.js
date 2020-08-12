// IMPORT MODULES
const express = require('express');
const {registerValidator,loginValidator} = require('../middlewares/validateInputs');

// EXPRESS ROUTER
const router = express.Router();

router.post('/register',registerValidator,(req,res) => {
  res.send('successful');
})

module.exports = router;