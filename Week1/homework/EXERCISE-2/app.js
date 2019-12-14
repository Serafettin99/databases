const mysql = require('mysql');
const { promisify } = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
});

const connect = promisify(connection.connect.bind(connection));
const executeQuery = promisify(connection.query.bind(connection));

const main = async () => {
  try {
    //connect to db
    await connect();
    const countriesOver8million = await executeQuery(
      'SELECT name, population FROM country WHERE population > 8000000',
    );

    const countryNamesWithLand = await executeQuery(
      `SELECT name FROM country WHERE name LIKE '%land%'`,
    );

    const citiesBetween500k_1000k = await executeQuery(
      `SELECT name, population FROM city WHERE population BETWEEN 500000 AND 1000000;`,
    );

    const countriesOnEurope = await executeQuery(
      `SELECT name FROM country WHERE continent = 'Europe'`,
    );

    const countriesOrderedByArea = await executeQuery(
      `SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC;`,
    );

    const allNetherlandsCities = await executeQuery(
      `SELECT name, countrycode from city where countrycode LIKE 'NLD';`,
    );

    const rotterdamPopulation = await executeQuery(
      `SELECT population, name FROM city WHERE name LIKE 'Rotterdam';`,
    );

    const top10CountriesByArea = await executeQuery(
      `SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10;`,
    );

    const mostPopulatedCities_Top10 = await executeQuery(
      `SELECT name, population FROM city ORDER BY population DESC LIMIT 10;`,
    );

    const sumOfPopulation = await executeQuery(
      `SELECT SUM(population) FROM country;`,
    );

    const results = [
      countriesOver8million,
      countryNamesWithLand,
      citiesBetween500k_1000k,
      countriesOnEurope,
      countriesOrderedByArea,
      allNetherlandsCities,
      rotterdamPopulation,
      top10CountriesByArea,
      mostPopulatedCities_Top10,
      sumOfPopulation,
    ];

    results.forEach(result => console.table(result));
  } catch (err) {
    console.error(err);
  } finally {
    connection.end();
  }
};

main();
