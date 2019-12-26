'use strict';

const mysql = require('mysql');
const { promisify } = require('util');
const employees = require('./employees.json');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const connect = promisify(connection.connect.bind(connection));
const executeQuery = promisify(connection.query.bind(connection));

const main = async () => {
  try {
    //connect to db
    await connect();
    //create db
    await executeQuery(`CREATE DATABASE IF NOT EXISTS week2_hw`);
    // //switch to week2_hw
    await executeQuery(`USE week2_hw`);
    // // Create a table, called employees. Give it the following fields    await executeQuery(
    await executeQuery(
      `CREATE TABLE IF NOT EXISTS employees (
        employee_no INT PRIMARY KEY AUTO_INCREMENT,
        full_name VARCHAR(100),
        salary INT,
        address VARCHAR(200),
        department_no INT)`,
    );

    // //Write a query that adds a foreign key to Employee table that points to itself, call it as manager
    await executeQuery(
      `ALTER TABLE employees ADD COLUMN manager INT(11), ADD CONSTRAINT F_K FOREIGN KEY (manager) REFERENCES employees(employee_no)`,
    );

    // Insert 20 rows in this table
    employees.forEach(
      async employee =>
        await executeQuery('INSERT INTO employees SET ?', employee),
    );
  } catch (err) {
    console.error(err);
  } finally {
    connection.end();
  }
};

main();
