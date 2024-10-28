const { Pool } = require("pg");

// Настройка соединения
const pool = new Pool({
  user: "postgres", // Имя пользователя PostgreSQL
  host: "localhost", // Хост сервера
  database: "database_coursework", // Название базы данных
  password: "NodrtZLZwKfA6Amq", // Пароль пользователя
  port: 5432, // Порт PostgreSQL (по умолчанию 5432)
});

// Функция для выполнения запросов
const query = (text, params) => pool.query(text, params);

pool
  .connect()
  .then((client) => {
    console.log("Connected to PostgreSQL successfully!");
    client.release(); // Освобождаем соединение
  })
  .catch((err) => console.error("Connection to PostgreSQL failed:", err.stack));

module.exports = {
  query,
  pool,
};
