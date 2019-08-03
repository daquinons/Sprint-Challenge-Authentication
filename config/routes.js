const axios = require('axios');
const bcrypt = require('bcryptjs');
const { authenticate, generateToken } = require('../auth/authenticate');
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

async function login(req, res, next) {
  const { username, password } = req.body;
  try {
    const user = await Users.findByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({ message: `Welcome back, ${username}!`, token: generateToken(user)});
    } else {
      res.status(401).json({ message: 'You shall not pass' });
    }
  } catch (error) {
    next(new Error(error.message));
  }
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
