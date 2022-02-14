const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');
const User = require('./models/userModel');
const bodyParser = require('body-parser');
const bookRouter = require('./routes/bookRouter')(Book);
const userRouter = require('./routes/userRouter')(User);
const cors = require('cors');
const expressJwt = require('express-jwt');
require('dotenv').config();

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bookAPI');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.all(
  '/api/*',
  expressJwt({
    secret: process.env.SIGNATURE,
    algorithms: ['HS256'],
  }).unless({
    path: ['/api/users/login'],
  })
);
app.use('/api', bookRouter, userRouter);
app.listen(8080);
