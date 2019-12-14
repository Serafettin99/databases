const mysql = require('mysql');
const { promisify } = require('util');

const [projects, employees, departments] = require('./data.json');

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

    await executeQuery('CREATE DATABASE IF NOT EXISTS company');

    //switch to company db
    await executeQuery('USE company');

    //Create a table called Employees with the following fields (emp_no, emp_name, salary and reports_to)
    await executeQuery(
      'CREATE TABLE IF NOT EXISTS employees(emp_no INT PRIMARY KEY AUTO_INCREMENT, emp_name VARCHAR(50), salary FLOAT, reports_to INT, FOREIGN KEY(reports_to) REFERENCES employees(emp_no)) ',
    );

    //Create a table called Departments with the following fields (dept_no, dept_name and manager)
    await executeQuery(
      'CREATE TABLE IF NOT EXISTS departments(dept_no INT PRIMARY KEY AUTO_INCREMENT , dept_name VARCHAR(50), manager INT, FOREIGN KEY(manager) REFERENCES employees(emp_no)) ',
    );
    //Create a table called Projects with the following fields (proj_no, proj_name, starting_date, ending_date)
    await executeQuery(
      'CREATE TABLE IF NOT EXISTS projects(proj_no INT PRIMARY KEY AUTO_INCREMENT, proj_name VARCHAR(50), starting_date DATETIME, ending_date DATETIME)',
    );

    //Add Projects
    projects.forEach(
      async project =>
        await executeQuery('INSERT INTO Projects SET ?', project),
    );

    //Add Employees
    employees.forEach(
      async employee =>
        await executeQuery('INSERT INTO employees SET ?', employee),
    );

    //Add Departments
    departments.forEach(
      async department =>
        await executeQuery('INSERT INTO departments SET ?', department),
    );
  } catch (err) {
    console.error(err);
  } finally {
    connection.end();
  }
};

main();
