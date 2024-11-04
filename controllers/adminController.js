const db = require("../db");

const getUsers = async (req, res) => {
  const result = await db.query(
    `SELECT id, username FROM admin.users ORDER BY id`
  );
  if (result) {
    const headers = result.fields.map((field) => field.name);
    const body = result.rows;
    res.json({ success: true, items: { headers, body } });
  } else {
    res.json({ success: false });
  }
};

module.exports = { getUsers };
