const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookModel = new Schema({
  title: {
    type: String,
    required: [true, 'Please enter a title.'],
    match: [
      /^[a-zA-Z0-9\s\u00f1\u00d1]+$/,
      'The title must contain only letters and numbers.',
    ],
  },
  author: {
    type: String,
    required: [true, 'Please enter an author.'],
    match: [/^[a-zA-Z\s\u00f1\u00d1]+$/, 'The name must contain only letters.'],
  },
  genre: {
    type: String,
    required: [true, 'Please enter a genre.'],
    match: [
      /^[a-zA-Z\s\u00f1\u00d1]+$/,
      'The genre must contain only letters.',
    ],
  },
  read: { type: Boolean },
});

module.exports = mongoose.model('Book', bookModel);
