// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const { PORT = 3000, NODE_ENV, JWT_SECRET } = process.env;

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
  'http://127.0.0.1:3001',
  'http://127.0.0.1:3000',
];

module.exports = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  regExp,
  allowedCors,
};
