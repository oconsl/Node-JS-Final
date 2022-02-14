const formLogin = document.getElementById('form-login');
const userName = document.getElementById('user-name');
const password = document.getElementById('password');
const paragraph = document.getElementById('token');
const copy = document.getElementById('copy');
const jumbotron = document.querySelector('.jumbotron');
const pre = document.querySelector('#token');
const hidden = document.querySelector('.hidden');
const login = formLogin.querySelector('#login');
const logout = formLogin.querySelector('#logout');

window.addEventListener('DOMContentLoaded', () => {
  copy.style.display = 'none';

  async function loginAuth(evt) {
    evt.preventDefault();

    const sendBody = {
      userName: userName.value,
      password: password.value,
    };

    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendBody),
      });

      // SAVE User in local storage
      const userInfo = await res.json();
      window.localStorage.setItem('loggedUser', JSON.stringify(userInfo));

      paragraph.innerText = userInfo.token;
      copy.style.display = 'inline';
      hidden.classList.remove('hidden');
    } catch (error) {
      alert(error);
      return;
    }
  }

  const copyToClipboard = () => {
    copy.innerText = '✓';
    navigator.clipboard.writeText(paragraph.innerText);
  };

  const scrollToken = (event) => {
    event.preventDefault();
    const delta = Math.sign(event.deltaY);
    pre.scrollLeft += delta * 100;
  };

  const logOut = () => {
    hidden.classList.add('hidden');
    window.localStorage.setItem('loggedUser', null);
    pre.innerText = '';
    userName.value = '';
    password.value = '';
    copy.innerText = 'Copy';
  };

  const submitInfo = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      login.click();
    }
  };

  login.addEventListener('click', loginAuth);
  logout.addEventListener('click', logOut);
  copy.addEventListener('click', copyToClipboard);
  jumbotron.addEventListener('wheel', scrollToken);
  userName.addEventListener('keyup', submitInfo);
  password.addEventListener('keyup', submitInfo);
});
