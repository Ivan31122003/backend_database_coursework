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

const putEmployees = async (req, res) => {
  try {
    const { employee } = req.body;
    const { first_name, father_name, last_name, position, salary } = employee;
    const result = await db.query(
      "INSERT INTO public.employees (first_name, father_name, last_name, position, salary) VALUES ($1, $2, $3, $4, $5)",
      [first_name, father_name, last_name, position, salary]
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

const updateEmployees = async (req, res) => {
  const { employee } = req.body;
  const result = await db.query(
    `UPDATE public.employees
      SET first_name = $1,
          father_name = $2,
          last_name = $3,
          position = $4,
          salary = $5
      WHERE id = $6;`,
    [
      employee.first_name,
      employee.father_name,
      employee.last_name,
      employee.position,
      employee.salary,
      employee.id,
    ]
  );
  if (result) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
};

const deleteEmployees = async (req, res) => {
  const { employeesIds } = req.body;
  const employeesIdsString = employeesIds.join(", ");
  const result = await db.query(
    `DELETE FROM public.employees WHERE id IN (${employeesIdsString});`
  );
  if (result) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
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

module.exports = {
  getEmployees,
  putEmployees,
  updateEmployees,
  deleteEmployees,
  getDepartments,
  getDepartmentsEmployees,
};
