const bookController = (Book) => {
  // GET book
  const getBooks = async (req, res) => {
    const { query } = req;

    if (Object.keys(query).length > 0) res.status(204).json(null);

    const response = await Book.find(query);
    res.status(200).json(response);
  };

  // POST book
  const postBook = async (req, res) => {
    const book = new Book(req.body);

    await book.save();
    res.status(201).json(book);
  };

  // GET book by ID
  const getBookById = async (req, res) => {
    const { params } = req;

    try {
      const response = await Book.findById(params.bookId);

      res.status(200).json(response);
    } catch (error) {
      res.status(500).send('An error has occurred.');
    }
  };

  // PUT book by ID
  const putBookById = async (req, res) => {
    const { body } = req;

    try {
      const response = await Book.updateOne(
        {
          _id: req.params.bookId,
        },
        {
          $set: {
            title: body.title,
            author: body.author,
            genre: body.genre,
            read: body.read,
          },
        }
      );
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json('An error has occurred.');
    }
  };

  // DELETE book by ID
  const deleteBookById = async (req, res) => {
    const id = req.params.bookId;

    try {
      await Book.findByIdAndDelete(id);

      res.status(202).json('The book has been deleted.');
    } catch (error) {
      res.status(500).json('An error has occurred.');
    }
  };

  // GET book by title
  const getBookByTitle = async (req, res, next) => {
    if (Object.keys(req.query).indexOf('title') !== -1) {
      const title = req.query.title;
      const response = await Book.findOne({ title: title });

      res.status(200).json(response);
      return;
    }

    next();
  };

  // GET book by author
  const getBookByAuthor = async (req, res, next) => {
    if (Object.keys(req.query).indexOf('author') !== -1) {
      const author = req.query.author;
      const response = await Book.findOne({ author: author });

      res.status(200).json(response);
      return;
    }
    next();
  };

  return {
    getBooks,
    postBook,
    getBookById,
    getBookByTitle,
    getBookByAuthor,
    putBookById,
    deleteBookById,
  };
};

module.exports = bookController;
