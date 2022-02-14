const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookModel = new Schema({
  title: {
    type: String,
    required: [true, 'Por favor ingrese un título.'],
    match: [
      /^[a-zA-Z0-9\s]+$/,
      'El título solo puede contener letras o números.',
    ],
  },
  author: {
    type: String,
    required: [true, 'Por favor ingrese un autor.'],
    match: [/^[a-zA-Z\s]+$/, 'El nombre del autor solo puede contener letras.'],
  },
  genre: {
    type: String,
    required: [true, 'Por favor ingrese un género.'],
    match: [/^[a-zA-Z\s]+$/, 'El género solo puede contener letras.'],
  },
  read: { type: Boolean },
});

module.exports = mongoose.model('Book', bookModel);
