//IMPORT MODULES
const express =  require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const passport = require('passport');
const {dbConnect} = require('./config');

// READ .env CONTENTS
dotenv.config();

// INITIALIZE EXPRESS
const app = express();

// PARSE INCOMING DATA
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// CONNECT DATABASE
dbConnect();

// AUTH ROUTES
app.use('/api/auth',require('./routes/auth'));

//SERVER LISTENING
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`server listening on port ${PORT}`))