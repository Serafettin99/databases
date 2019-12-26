'use strict';

const {
  departments,
  connection,
  connect,
  executeQuery,
} = require('../module/module.js');

const main = async () => {
  try {
    await connect();

    // Create another table, called department with fields:(dept_no(Primary Key), title, description, address)
    await executeQuery(`CREATE TABLE IF NOT EXISTS departments (
      dept_no INT PRIMARY KEY, 
      title VARCHAR(100), 
      description VARCHAR(200), 
      address VARCHAR(200))`);

    await executeQuery(
      'ALTER TABLE employees ADD Constraint FOREIGN KEY(department_no) REFERENCES departments(dept_no)',
    );

    departments.forEach(async department => {
      await executeQuery(`INSERT INTO departments SET ?`, department);
    });
  } catch (err) {
    console.error(err);
  } finally {
    connection.end();
  }
};

main();
