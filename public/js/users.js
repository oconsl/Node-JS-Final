// FORM elements
const formUser = document.getElementById('form-user');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const userName = document.getElementById('user-name');
const password = document.getElementById('password');
const email = document.getElementById('email');
const address = document.getElementById('address');
const phone = document.getElementById('phone');

// LIST element
const userId = document.getElementById('user-id');

// RESULT BOX element
const paragraph = document.getElementById('paragraph');

// RESULT BOX CONTAINER element
const jumbotron = document.querySelector('.jumbotron');

// CHECKLIST elements
const getChecklist = document.querySelector('.get-checklist');
const checklist = document.querySelector('.checklist');
const checklistOptions = checklist.querySelectorAll('.checkbox');
const idCheck = document.querySelector('#id-check');
const usernameCheck = document.querySelector('#username-check');

// FETCH interceptor
import fetchInterceptor from './fetchInterceptor.js';

window.addEventListener('DOMContentLoaded', () => {
  fetchInterceptor;

  // POST user
  async function postUser(evt) {
    evt.preventDefault();

    const sendBody = {
      firstName: firstName.value,
      lastName: lastName.value,
      userName: userName.value,
      password: password.value,
      email: email.value,
      address: address.value,
      phone: phone.value,
    };

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(sendBody),
      });

      if (res.status === 500) {
        throw Error('User, Address, Email or Phone repeated.');
      } else if (res.status === 400) {
        res
          .text()
          .then((text) => {
            const errors = JSON.parse(text);
            msg = Object.values(errors)
              .map((msgError) => `-> ${msgError} \n`)
              .join('');
            throw new Error(msg);
          })
          .catch((err) => {
            alert(err.message);
          });
      } else if (res.status === 401) {
        throw Error('Token expired.');
      } else if (res.status === 403) {
        throw Error('Invalid Token.');
      } else {
        getUsers(null);

        alert('User saved!');
      }
    } catch (error) {
      alert(error.message);
      return;
    }
  }

  // GET users
  async function getUsers(evt) {
    if (evt !== null) evt.preventDefault();

    try {
      const res = await fetch('/api/users', {
        method: 'GET',
      });

      if (res.status === 401) {
        throw Error('Token expired.');
      } else if (res.status === 403) {
        throw Error('Invalid Token.');
      } else {
        const users = await res.json();

        // ID menu
        const selectIdMenu = document.getElementById('user-id');
        // REMOVE childs!
        const childs = selectIdMenu.querySelectorAll('option');
        childs.forEach((child) => selectIdMenu.removeChild(child));

        users.forEach((user) => {
          let opt = document.createElement('option');
          opt.value = user._id;
          opt.text = `${user.userName}`;
          selectIdMenu.appendChild(opt);
        });

        const elements = users.map((book) =>
          JSON.stringify(book, null, '    ')
        );

        paragraph.innerText = elements;
      }
    } catch (error) {
      alert(error.message);
      return;
    }
  }

  // PUT user by id
  async function putUserById(evt) {
    evt.preventDefault();

    const sendBody = {
      firstName: firstName.value,
      lastName: lastName.value,
      userName: userName.value,
      password: password.value,
      email: email.value,
      address: address.value,
      phone: phone.value,
    };

    try {
      const res = await fetch(`/api/users/${userId.value}`, {
        method: 'PUT',
        body: JSON.stringify(sendBody),
      });

      if (res.status === 500) {
        throw Error('User or Email repeated.');
      } else if (res.status === 400) {
        res
          .text()
          .then((text) => {
            const errors = JSON.parse(text);
            msg = Object.values(errors)
              .map((msgError) => `-> ${msgError} \n`)
              .join('');
            throw new Error(msg);
          })
          .catch((err) => {
            alert(err.message);
          });
      } else if (res.status === 401) {
        throw Error('Token expired.');
      } else if (res.status === 403) {
        throw Error('Invalid Token.');
      } else {
        getUsers(null);

        alert('User modified!');
      }
    } catch (error) {
      alert(error.message);
      return;
    }
  }

  // DELETE user by id
  async function deleteUserById(evt) {
    evt.preventDefault();

    try {
      const res = await fetch('/api/users/' + userId.value, {
        method: 'DELETE',
      });

      if (res.status === 401) {
        throw Error('Token expired.');
      } else if (res.status === 403) {
        throw Error('Invalid Token.');
      } else {
        getUsers(null);

        alert('User erased!');
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

  // Only one checkbox must be checked! >:(
  const handleChecklistClick = (event) => {
    checklistOptions.forEach((div) => {
      const checkbox = div.children.item(0);
      const input = checkbox.children.item(0);

      if (input !== event.target) {
        input.checked = false;
      }
    });
  };

  // CUSTOM GET for each checkbox
  const handleGetChecklistClick = async () => {
    if (idCheck.checked) {
      try {
        const res = await fetch('/api/users/' + userId.value, {
          method: 'GET',
        });

        if (res.status === 403) {
          throw new Error('Invalid Token.');
        } else {
          const user = await res.json();

          paragraph.innerText = JSON.stringify(user, null, '    ');
        }
      } catch (error) {
        alert(error.message);
        return;
      }
    } else if (usernameCheck.checked) {
      try {
        const user = document.querySelector(`option[value="${userId.value}"]`);
        const username = user.innerText.trimStart().trim();

        const res = await fetch('/api/users?userName=' + username, {
          method: 'GET',
        });

        if (res.status === 403) {
          throw new Error('Invalid Token.');
        } else {
          const user = await res.json();

          paragraph.innerText = JSON.stringify(user, null, '    ');
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
  formUser.querySelector('#post').addEventListener('click', postUser);
  formUser.querySelector('#get').addEventListener('click', getUsers);
  formUser.querySelector('#delete').addEventListener('click', deleteUserById);
  formUser.querySelector('#put').addEventListener('click', putUserById);

  // CHECKLIST events
  getChecklist.addEventListener('click', handleGetChecklistClick);
  idCheck.addEventListener('click', handleChecklistClick);
  usernameCheck.addEventListener('click', handleChecklistClick);

  // SCROLLBAR event
  jumbotron.addEventListener('wheel', scrollInfo);
});
