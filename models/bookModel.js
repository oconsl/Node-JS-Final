const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookModel = new Schema({
  title: {
    type: String,
    required: [true, 'Por favor ingrese un título.'],
    match: [
      /^[a-zA-Z0-9\s\u00f1\u00d1]+$/,
      'El título solo puede contener letras o números.',
    ],
  },
  author: {
    type: String,
    required: [true, 'Por favor ingrese un autor.'],
    match: [
      /^[a-zA-Z\s\u00f1\u00d1]+$/,
      'El nombre del autor solo puede contener letras.',
    ],
  },
  genre: {
    type: String,
    required: [true, 'Por favor ingrese un género.'],
    match: [
      /^[a-zA-Z\s\u00f1\u00d1]+$/,
      'El género solo puede contener letras.',
    ],
  },
  read: { type: Boolean },
});

module.exports = mongoose.model('Book', bookModel);
