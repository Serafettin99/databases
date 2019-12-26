'use strict';

const { connection, connect, executeQuery } = require('../module/module.js');

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
    connection.end();
  }
};
main();
