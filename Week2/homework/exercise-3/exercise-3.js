'use strict';

const mysql = require('mysql');
const { promisify } = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'week2_hw',
});

const connect = promisify(connection.connect.bind(connection));
const executeQuery = promisify(connection.query.bind(connection));

const main = async () => {
  try {
    await connect();

    // Write a query that retrieves all employees and their corresponding manager's full name
    const retrievedEmpsWithMngrs = await executeQuery(
      `SELECT emps1.full_name, emps2.full_name AS "manager's name" 
        FROM employees emps1 
        LEFT JOIN employees emps2 
        ON emps1.manager = emps2.employee_no `,
    );

    // Write a query that retrieves all employees and their working department title. If no employee worked in a specific department, return the department too.
    const retrievedEmpsWithDpts = await executeQuery(
      `SELECT departments.title, employees.full_name AS "Department's Name"
      FROM employees
      RIGHT JOIN departments
      ON employees.department_no = departments.dept_no`,
    );

    console.table(retrievedEmpsWithMngrs);
    console.table(retrievedEmpsWithDpts);
  } catch (err) {
    console.table(err);
  } finally {
    connect.end;
  }
};
main();
