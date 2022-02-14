// FORM elements
const formBook = document.getElementById('form-book');
const title = document.getElementById('title');
const genre = document.getElementById('genre');
const author = document.getElementById('author');
const readed = document.querySelector('#readed');

// LIST element
const bookId = document.getElementById('book-id');

// RESULT BOX element
const paragraph = document.getElementById('paragraph');

// RESULT BOX CONTAINER element
const jumbotron = document.querySelector('.jumbotron');

// CHECKLIST elements
const getChecklist = document.querySelector('.get-checklist');
const checklist = document.querySelector('.checklist');
const checklistOptions = checklist.querySelectorAll('.checkbox');
const idCheck = document.querySelector('#id-check');
const titleCheck = document.querySelector('#title-check');
const authorCheck = document.querySelector('#author-check');

// FETCH interceptor
import fetchInterceptor from './fetchInterceptor.js';

window.addEventListener('DOMContentLoaded', () => {
  fetchInterceptor;

  // POST book request
  async function postBook(evt) {
    evt.preventDefault();

    const sendBody = {
      title: title.value,
      genre: genre.value,
      author: author.value,
      read: readed.checked,
    };

    try {
      const res = await fetch('/api/books', {
        method: 'POST',
        body: JSON.stringify(sendBody),
      });

      if (res.status === 401) {
        throw new Error('Token expired.');
      } else if (res.status === 403) {
        throw Error('Invalid Token.');
      } else {
        getBooks(null);

        alert('Book saved!');
      }
    } catch (error) {
      alert(error.message);
      return;
    }
  }

  // GET books request
  async function getBooks(evt) {
    if (evt !== null) evt.preventDefault();

    try {
      const res = await fetch('/api/books', {
        method: 'GET',
      });

      if (res.status === 401) {
        throw new Error('Token expired.');
      } else if (res.status === 403) {
        throw Error('Invalid Token.');
      } else {
        const books = await res.json();

        // ID menu
        const selectIdMenu = document.getElementById('book-id');
        // REMOVE child!
        const childs = selectIdMenu.querySelectorAll('option');
        childs.forEach((child) => selectIdMenu.removeChild(child));

        books.forEach((book) => {
          let opt = document.createElement('option');
          opt.value = book._id;
          opt.text = `${book.title}, ${book.genre}, ${book.author}, ${
            book.read ? 'LEÍDO.' : 'NO LEÍDO.'
          }`;
          selectIdMenu.appendChild(opt);
        });

        const elements = books.map((book) =>
          JSON.stringify(book, null, '    ')
        );

        paragraph.innerText = elements;
      }
    } catch (error) {
      alert(error.message);
      return;
    }
  }

  // DELETE book by id request
  async function deleteBookById(evt) {
    evt.preventDefault();

    try {
      const res = await fetch('/api/books/' + bookId.value, {
        method: 'DELETE',
      });

      if (res.status === 401) {
        throw new Error('Token expired.');
      } else if (res.status === 403) {
        throw Error('Invalid Token.');
      } else {
        getBooks(null);

        alert('Book erased!');
      }
    } catch (error) {
      alert(error.message);
      return;
    }
  }

  // PUT book by id request
  async function putBookById(evt) {
    evt.preventDefault();

    const sendBody = {
      title: title.value,
      genre: genre.value,
      author: author.value,
      read: document.querySelector('#readed').checked,
    };

    try {
      const res = await fetch('/api/books/' + bookId.value, {
        method: 'PUT',
        body: JSON.stringify(sendBody),
      });

      if (res.status === 401) {
        throw new Error('Token expired.');
      } else if (res.status === 403) {
        throw Error('Invalid Token.');
      } else {
        getBooks(null);

        alert('Book modified!');
      }
    } catch (error) {
      alert(error.message);
      return;
    }
  }

  // Just another scrollbar function :D
  const scrollInfo = (event) => {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    paragraph.scrollLeft += delta * 100;
  };

  const handleChecklistClick = (event) => {
    checklistOptions.forEach((div) => {
      const checkbox = div.children.item(0);
      const input = checkbox.children.item(0);

      if (input !== event.target) {
        input.checked = false;
      }
    });
  };

  const handleGetChecklistClick = async () => {
    if (idCheck.checked) {
      try {
        const res = await fetch('/api/books/' + bookId.value, {
          method: 'GET',
        });

        if (res.status === 401) {
          throw new Error('Token expired.');
        } else if (res.status === 403) {
          throw Error('Invalid Token.');
        } else {
          const book = await res.json();

          paragraph.innerText = JSON.stringify(book, null, '    ');
        }
      } catch (error) {
        alert(error.message);
        return;
      }
    } else if (titleCheck.checked) {
      try {
        const book = document.querySelector(`option[value="${bookId.value}"]`);
        const title = book.innerText
          .split(',')[0]
          .trimStart()
          .replace(' ', '%20');

        const res = await fetch('/api/books?title=' + title, {
          method: 'GET',
        });

        if (res.status === 401) {
          throw new Error('Token expired.');
        } else if (res.status === 403) {
          throw Error('Invalid Token.');
        } else {
          const book = await res.json();

          paragraph.innerText = JSON.stringify(book, null, '    ');
        }
      } catch (error) {
        alert(error.message);
        return;
      }
    } else if (authorCheck.checked) {
      try {
        const book = document.querySelector(`option[value="${bookId.value}"]`);
        const author = book.innerText
          .split(',')[2]
          .trimStart()
          .replace(' ', '%20');

        const res = await fetch('/api/books?author=' + author, {
          method: 'GET',
        });

        if (res.status === 401) {
          throw new Error('Token expired.');
        } else if (res.status === 403) {
          throw Error('Invalid Token.');
        } else {
          const book = await res.json();

          paragraph.innerText = JSON.stringify(book, null, '    ');
        }
      } catch (error) {
        alert(error.message);
        return;
      }
    } else {
      alert('Please select an option and an element for search.');
    }
  };

  // CRUD events
  formBook.querySelector('#post').addEventListener('click', postBook);
  formBook.querySelector('#get').addEventListener('click', getBooks);
  formBook.querySelector('#delete').addEventListener('click', deleteBookById);
  formBook.querySelector('#put').addEventListener('click', putBookById);

  // CHECKLIST events
  getChecklist.addEventListener('click', handleGetChecklistClick);
  idCheck.addEventListener('click', handleChecklistClick);
  titleCheck.addEventListener('click', handleChecklistClick);
  authorCheck.addEventListener('click', handleChecklistClick);

  // SCROLLBAR event
  jumbotron.addEventListener('wheel', scrollInfo);
});
