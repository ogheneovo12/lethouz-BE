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
const mongoURI = process.env.DB_URI
dbConnect(mongoURI);

// INITIALIZE PASSPORT
passport.initialize();
require('./config/passport')(passport);

// AUTH ROUTES
app.use('/api/auth',require('./routes/auth'));

app.get('/protected',passport.authenticate('jwt',{session: false}),(req,res)=>{
  res.send('passed');
})
//SERVER LISTENING
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`server listening on port ${PORT}`))