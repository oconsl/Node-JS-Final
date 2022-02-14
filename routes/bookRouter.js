const express = require('express');
const booksController = require('../controllers/bookController');
const validator = require('express-joi-validation').createValidator();
const bookValidator = require('../validations/bookValidator');
const idValidator = require('../validations/idValidator');
const bookQueryValidator = require('../validations/bookQueryValidator');

const routes = (Book) => {
  const bookRouter = express.Router();

  const {
    getBooks,
    postBook,
    getBookById,
    getBookByTitle,
    getBookByAuthor,
    putBookById,
    deleteBookById,
  } = booksController(Book);

  bookRouter
    .route('/books')
    .get(
      validator.query(bookQueryValidator),
      getBookByTitle,
      getBookByAuthor,
      getBooks
    )
    .post(validator.body(bookValidator), postBook);

  bookRouter
    .route('/books/:bookId')
    .get(validator.params(idValidator), getBookById)
    .put(
      validator.params(idValidator),
      validator.body(bookValidator),
      putBookById
    )
    .delete(validator.params(idValidator), deleteBookById);

  return bookRouter;
};

module.exports = routes;
