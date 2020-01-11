'use strict';
const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
});

conn.connect(error => {
  if (error) console.log(error.message);
  else console.log('Connected...');
});

function getPopulation(cityOrCountry, name, cb) {
  // assuming that connection to the database is established and stored as conn
  // Rewrite the function so that it is no longer vulnerable to SQL injection

  conn.query(
    `SELECT Population FROM ${cityOrCountry} WHERE Name = '${name}'`,
    // The only think to rewrite in order to prevent injection is replace the line above with that:
    // `SELECT Population FROM ${cityOrCountry} WHERE Name = ?`, name,
    function(err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error('Not found'));
      else cb(null, result[0].Population);
    },
  );
}

// Give an example of a value that can be passed as name that would take advantage of SQL-injection
// (for example, to insert new fake data in the database)
// => Mysql library does not allow to insert new data via SQL-injection. However we can get data via it.
// SELECT Population FROM City WHERE Name = '' OR ''=''
getPopulation('city', `' OR ''='`, (err, result) => {
  if (err) console.error(err.message);
  else console.log('Result: ', result);
});
