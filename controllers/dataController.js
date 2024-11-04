const db = require("../db");

const getEmployees = async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM public.employees ORDER BY id`);
    if (result) {
      const headers = result.fields.map((field) => field.name);
      const body = result.rows;
      res.json({ success: true, items: { headers, body } });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getDepartments = async (req, res) => {
  const result = await db.query(`SELECT * FROM public.departments ORDER BY id`);
  if (result) {
    const headers = result.fields.map((field) => field.name);
    const body = result.rows;
    res.json({ success: true, items: { headers, body } });
  } else {
    res.json({ success: false });
  }
};

const getDepartmentsEmployees = async (req, res) => {
  const result = await db.query(
    `SELECT * FROM public.departments_employees ORDER BY id`
  );
  if (result) {
    const headers = result.fields.map((field) => field.name);
    const body = result.rows;
    res.json({ success: true, items: { headers, body } });
  } else {
    res.json({ success: false });
  }
};

module.exports = { getEmployees, getDepartments, getDepartmentsEmployees };
