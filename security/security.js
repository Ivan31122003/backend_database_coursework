const db = require("../db");

const parseToken = (token) => {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};

const checkRights = async (req, res, next) => {
  // console.log(`Максимальное количество подключений: ${db.pool.options.max}`);
  // console.log(`Всего подключений: ${db.pool.totalCount}`);
  // console.log(`Свободных подключений: ${db.pool.idleCount}`);
  // console.log(`Запросов в ожидании: ${db.pool.waitingCount}`);
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
