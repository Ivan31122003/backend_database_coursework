const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/hello", async (req, res) => {
  const result = await db.query("SELECT * FROM users");
  console.log(result.rows);
  res.json(result.rows);
});

app.post("/auth", async (req, res) => {
  const { login, password } = req.body;
  const result = await db.query(
    `SELECT 1 FROM users WHERE login = $1 AND password_hash = $2`,
    [login, password]
  );
  res.json({ auth: result.rows.length > 0 });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
