const { fetch: originalFetch } = window;

// Use this instead the infinite token only if you have
// a valid user with hashRate = 10 with bcrypt

// const token = JSON.parse(localStorage.getItem('loggedUser'))?.token;

// INFINITE TOKEN :D
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InN0Z28xODk2IiwiaWQiOiI2MWZmMmFkZGM5NzYxY2Y5YmM4Mjk3MzgiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjQ0MTUxNDk4fQ.i2cI6v6TcCgbXxK46bggksANTszrXbGu8mgNF33XAuw';

export default window.fetch = async (...args) => {
  let [resource, config] = args;

  if (!args) return;

  config.headers = {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  const response = await originalFetch(resource, config);

  return response;
};
