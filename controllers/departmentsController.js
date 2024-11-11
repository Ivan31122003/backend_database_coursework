const db = require("../db");

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

const putDepartments = async (req, res) => {
  try {
    const { department } = req.body;
    const result = await db.query(
      "INSERT INTO public.departments (name) VALUES ($1)",
      [department.name]
    );
    if (result?.rowCount > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    if (error.code === "P0001") {
      console.error("Database Trigger Error:", error.message);
      res.status(200).send({ error: error.message });
    } else {
      console.error("Unexpected error:", error);
      res.status(500).send({ error: "Server error" });
    }
  }
};

const updateDepartments = async (req, res) => {
  const { department } = req.body;
  const result = await db.query(
    `UPDATE public.departments
        SET name = $1
        WHERE id = $2;`,
    [department.name, department.id]
  );
  if (result) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
};

const deleteDepartments = async (req, res) => {
  const { departmentsIds } = req.body;
  const departmentsIdsString = departmentsIds.join(", ");
  const result = await db.query(
    `DELETE FROM public.departments WHERE id IN (${departmentsIdsString});`
  );
  if (result) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
};

module.exports = {
  getDepartments,
  putDepartments,
  updateDepartments,
  deleteDepartments,
};
