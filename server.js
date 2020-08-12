const express =  require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

//READ .env CONTENTS
dotenv.config()

//INITIALIZE EXPRESS
const app = express();