/* eslint-disable operator-linebreak */
const regExp =
  /^((http|https):\/\/)(www.)?[a-zA-Z0-9@:%._\\+~#?&\\=-]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._\\+~#?&\\=]*)((\/[a-zA-Z0-9@:%._\\+~#?&\\=-]{2,256})*)?/;

const allowedCors = [
  'https://lizaiutina.nomoredomains.monster',
  'http://lizaiutina.nomoredomains.monster',
  'https://api.lizaiutina.nomoredomains.monster',
  'http://api.lizaiutina.nomoredomains.monster',
  'localhost:3000',
  'http://localhost:3000',
  'localhost:3001',
  'http://localhost:3001',
];

module.exports = {
  regExp,
  allowedCors,
};
