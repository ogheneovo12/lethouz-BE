// //IMPORT MODULES
// const express =  require('express');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const passport = require('passport');
// const {dbConnect} = require('./config');

// // READ .env CONTENTS
// dotenv.config();

// // INITIALIZE EXPRESS
// const app = express();

// // PARSE INCOMING DATA
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
// app.use(bodyParser.json());

// // CONNECT DATABASE
// const mongoURI = process.env.DB_URI
// dbConnect(mongoURI);

// // INITIALIZE PASSPORT
// passport.initialize();
// require('./config/passport')(passport);

// // AUTH ROUTES
// app.use('/api/auth',require('./routes/auth'));

// //custom passport middleware
// app.use('/protected', function(req, res, next) {
//   passport.authenticate('jwt', function(err, user) {
//     if (err || !user) next() 
//   })(req, res, next);
// });

// app.use((req,res,next) => {
//   res.status(404).send(404,'med o')
// })

// //SERVER LISTENING
// const PORT = process.env.PORT || 5000;
// app.listen(PORT,() => console.log(`server listening on port ${PORT}`))
import { createServer } from "http";
import * as config from "./config";
import app from "./loaders"


app.loadAll(app)
  .then(() => {
     const server = createServer(app);

     server.listen(config.port,()=>{
       console.log(`server running on port ${config.port}`);
   })
})