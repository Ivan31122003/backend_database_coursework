const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "database_coursework",
  password: "NodrtZLZwKfA6Amq",
  port: 5432,
});

const query = (text, params) => pool.query(text, params);

pool
  .connect()
  .then((client) => {
    console.log("Connected to PostgreSQL successfully!");
    client.release();
  })
  .catch((err) => console.error("Connection to PostgreSQL failed:", err.stack));

module.exports = {
  query,
  pool,
};
