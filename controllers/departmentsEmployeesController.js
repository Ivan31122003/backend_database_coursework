const db = require("../db");

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

const putDepartmentsEmployees = async (req, res) => {
  try {
    const { departmentEmployee } = req.body;
    const result = await db.query(
      "INSERT INTO public.departments_employees (department_id, employee_id) VALUES ($1, $2)",
      [departmentEmployee.department_id, departmentEmployee.employee_id]
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

const updateDepartmentsEmployees = async (req, res) => {
  const { departmentEmployee } = req.body;
  const result = await db.query(
    `UPDATE public.departments_employees
        SET department_id = $1,
        employee_id = $2
        WHERE id = $3;`,
    [
      departmentEmployee.department_id,
      departmentEmployee.employee_id,
      departmentEmployee.id,
    ]
  );
  if (result) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
};

const deleteDepartmentsEmployees = async (req, res) => {
  const { departmentsEmployeesIds } = req.body;
  const departmentsEmployeesIdsString = departmentsEmployeesIds.join(", ");
  const result = await db.query(
    `DELETE FROM public.departments_employees WHERE id IN (${departmentsEmployeesIdsString});`
  );
  if (result) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
};

module.exports = {
  getDepartmentsEmployees,
  putDepartmentsEmployees,
  updateDepartmentsEmployees,
  deleteDepartmentsEmployees,
};
