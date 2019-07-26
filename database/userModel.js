const db = require('./dbConfig');

exports.create = (username, password) => {
  return db('users').insert({ username, password });
};
