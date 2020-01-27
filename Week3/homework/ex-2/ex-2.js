'use strict';

const mysql = require('mysql');
const { promisify } = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'company',
});

const connect = promisify(connection.connect.bind(connection));
const runQuery = promisify(connection.query.bind(connection));

const flatify = async (dept_no, emp_no) => {
  try {
    //connect to db;
    await connect();

    //start Query
    await runQuery(`BEGIN;`);

    //join
    const employeeIDs = await runQuery(
      `SELECT emp_no FROM employees
      JOIN departments 
      ON employees.reports_to = departments.manager
      WHERE dept_no=?`,
      dept_no,
    );

    await runQuery(
      `UPDATE departments SET manager = ? WHERE dept_no = ?`,
      emp_no,
      dept_no,
    );

    employeeIDs.forEach(async employeeID => {
      await runQuery(
        `UPDATE employees 
        SET reports_to = ? 
        WHERE emp_no = ?`,
        [[emp_no, employeeID]],
      );
    });

    await runQuery(`COMMIT;`);
  } catch (error) {
    console.log(error.message);
  } finally {
    connection.end();
  }
};

flatify(2, 1);
