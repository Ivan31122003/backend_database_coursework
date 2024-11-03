const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");
const PORT = 3000;

app.use(cors());
app.use(express.json());
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const SECRET_KEY = crypto.randomBytes(32).toString("hex");

app.get("/hello", async (req, res) => {
  const result = await db.query("SELECT * FROM users");
  console.log(result.rows);
  res.json(result.rows);
});

app.post("/auth", async (req, res) => {
  const { username, password } = req.body;
  const result = await db.query(
    `SELECT * FROM users WHERE username = $1 LIMIT 1`,
    [username]
  );
  if (result.rows.length > 0) {
    const isMatch = await bcrypt.compare(
      password,
      result.rows[0].password_hash
    );
    if (isMatch) {
      const payload = {
        id: result.rows[0].id,
        username: result.rows[0].username,
      };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
      res.json({ success: true, token: token });
    } else {
      res.json({ success: false });
    }
  } else {
    res.json({ success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const hashPassword = async (password) => {
  const saltRounds = 7;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
