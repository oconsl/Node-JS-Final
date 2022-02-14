const mongoose = require('mongoose');

const { Schema } = mongoose;

const userModel = new Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter a name.'],
    match: [/^[a-zA-Z\s\u00f1\u00d1]+$/, 'The name must contain only letters.'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter a last name.'],
    match: [
      /^[a-zA-Z\s\u00f1\u00d1]+$/,
      'The last name must contain only letters.',
    ],
  },
  userName: {
    type: String,
    required: [true, 'Please enter an user name.'],
    match: [
      /^[a-zA-Z0-9\u00f1\u00d1]+$/,
      'The user name must contain only letters.',
    ],
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password.'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email.'],
    match: [/\S+@\S+\.\S+/, 'The email must to be a valid one.'],
    unique: true,
    trim: true,
    sparse: true,
  },
  address: {
    type: String,
    required: [true, 'Please enter an address.'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Please enter a phone number.'],
    match: [/^[0-9]+$/, 'The phone number must contain only numbers.'],
    trim: true,
  },
});

module.exports = mongoose.model('User', userModel);
