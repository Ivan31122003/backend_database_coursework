const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const SECRET_KEY = crypto.randomBytes(32).toString("hex");

const authenticateUser = async (req, res) => {
  const { username, password } = req.body;
  const result = await db.query(
    `SELECT * FROM admin.users WHERE username = $1 LIMIT 1`,
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
      return res.json({ success: true, token });
    }
  }

  res.json({ success: false });
};

module.exports = { authenticateUser };
