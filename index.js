const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Book = require('./models/bookModel');
const User = require('./models/userModel');
const bookRouter = require('./routes/bookRouter')(Book);
const userRouter = require('./routes/userRouter')(User);
const cors = require('cors');
const expressJwt = require('express-jwt');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DB_PROD);

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.all(
  '/api/*',
  expressJwt({
    secret: process.env.SIGNATURE,
    algorithms: ['HS256'],
  }).unless({
    path: ['/api/users/login', '/api/users/register'], 
  })
);
app.use('/api', bookRouter, userRouter);
app.listen(process.env.PORT, () => console.log('App running on PORT: ', process.env.PORT));
