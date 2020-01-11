'use strict';
// The Human Resources department (HR) wants to keep track of the skills of different employees.
// For this, they suggest adding a skills column in the employee table.
// The idea is to write the skills as a string, for example: "Node.JS, SQL, React" or "SCRUM, product management" etc.
// This is what they came up with:
// | emp_no | emp_name | salary | reports_to | skills                    |
// | ------ | -------- | ------ | ---------- | ------------------------- |
// | 1      | John     | 5000   |            | SCRUM, product management |
// | 2      | Daenerys | 3000   | 1          | Node.JS, SQL, React       |
// You know that this is not good database design, so you suggest an alternative approach that complies with database normal forms: you need to add extra table(s).
// Think about how many new tables are needed.
// => We need 2 tables which are skills_table and employee_skills_table// Write a query for each table that needs to be created. Make sure to also specify the correct data types for each column

const mysql = require('mysql');
const { promisify } = require('util');

const [skills, employee_skills] = require('./data.json');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'company',
});

const connect = promisify(connection.connect.bind(connection));
const runQuery = promisify(connection.query.bind(connection));

const main = async () => {
  try {
    // Write a query for each table that needs to be created.
    // Make sure to also specify the correct data types for each column
    const createSkills_Table = `CREATE TABLE IF NOT EXISTS skills (
      skill VARCHAR(25), id INT PRIMARY KEY AUTO_INCREMENT
    )`;
    await runQuery(createSkills_Table);

    const createEmployee_Skills_Table = `CREATE TABLE IF NOT EXISTS employee_skills (
      employee_id INT, skill_id INT, 
      FOREIGN KEY(employee_id) REFERENCES employees(emp_no),
      FOREIGN key(skill_id) REFERENCES skills(id))`;
    await runQuery(createEmployee_Skills_Table);

    // Add 5 rows to each table. Create the dataset yourself (it needs to be relevant to the table)
    skills.forEach(
      async skill => await runQuery(`INSERT INTO skills SET ?`, skill),
    );
    employee_skills.forEach(
      async employee_skill =>
        await runQuery(`INSERT INTO employee_skills SET ?`, employee_skill),
    );
  } catch (error) {
    console.log(error.message);
  } finally {
    connection.end();
  }
};

main();
