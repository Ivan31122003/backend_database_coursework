const db = require("../db");

const parseToken = (token) => {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

const checkRights = async (req, res, next) => {
  const { token } = req.body;
  const user = parseToken(token);
  const result = await db.query(
    `SELECT * FROM admin.check_route_access($1, $2)`,
    [user.id, req.route.path]
  );
  if (!result.rows[0].check_route_access.exists) {
    return res.json({ access: false });
  }
  next();
};

module.exports = { checkRights };
