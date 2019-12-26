'use strict';

const mysql = require('mysql');
const { promisify } = require('util');
const employees = require('./employees.json');
const departments = require('./departments.json');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2_hw',
});

const connect = promisify(connection.connect.bind(connection));
const executeQuery = promisify(connection.query.bind(connection));

module.exports = { employees, departments, connection, connect, executeQuery };
