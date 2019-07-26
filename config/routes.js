const axios = require('axios');
const bcrypt = require('bcryptjs');
const { authenticate } = require('../auth/authenticate');
const Users = require('../database/userModel');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res, next) {
  const { username, password } = req.body;
  try {
    const response = await Users.create(
      username,
      bcrypt.hashSync(password, 12)
    );
    res.status(201).json(response);
  } catch (error) {
    next(new Error(error.message));
  }
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' }
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
