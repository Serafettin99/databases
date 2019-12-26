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

    // retrieve All department numbers and the number of employees working there.
    const numOfDepsAndEmps = await executeQuery(
      `SELECT employees.department_no,
       COUNT(*) FROM employees 
       RIGHT JOIN departments 
       ON employees.department_no = departments.dept_no 
       GROUP BY  department_no`,
    );

    // retrieve Sum of the salaries of all employees
    const sumOfAllSalaries = await executeQuery(
      `SELECT SUM(salary) AS total_salaries FROM employees`,
    );

    // retrieve Average of the salaries of all employees
    const avgOfAllSalaries = await executeQuery(
      `SELECT AVG(salary) AS AVG_salary FROM employees`,
    );

    // retrieve Sum of the salaries of the employees per department
    const sumOfSalariesPerDept = await executeQuery(
      `SELECT departments.title, 
       SUM(salary) FROM employees
       JOIN departments 
       ON employees.department_no = departments.dept_no 
       GROUP BY department_no`,
    );

    // retrieve Minimum and maximum of the salaries per department

    const minSalariesPerDept = await executeQuery(
      `SELECT departments.title, 
       MIN(salary) FROM employees
       JOIN departments 
       ON employees.department_no = departments.dept_no 
       GROUP BY department_no`,
    );

    const maxSalariesPerDept = await executeQuery(
      `SELECT departments.title, 
       MAX(salary) FROM employees
       JOIN departments 
       ON employees.department_no = departments.dept_no 
       GROUP BY department_no`,
    );
    
    // For each salary value, return the number of employees paid.
    const numberOfForEachEmpsPaid = await executeQuery(
      `SELECT salary, COUNT(employee_no) FROM employees GROUP BY salary`,
    );

    const results = [
      numOfDepsAndEmps,
      sumOfAllSalaries,
      avgOfAllSalaries,
      sumOfSalariesPerDept,
      minSalariesPerDept,
      maxSalariesPerDept,
      numberOfForEachEmpsPaid,
    ];
    results.forEach(result => console.table(result));
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};
main();
