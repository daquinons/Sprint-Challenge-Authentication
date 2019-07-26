const db = require('./dbConfig');

exports.create = (username, password) => {
  return db('users').insert({ username, password });
};

exports.findByUsername = username => {
  return db('users')
    .where({ username })
    .first();
};
