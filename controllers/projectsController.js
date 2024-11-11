const db = require("../db");

const getProjects = async (req, res) => {
  try {
    const result = await db.query(`SELECT * FROM public.projects ORDER BY id`);
    if (result) {
      const headers = result.fields.map((field) => field.name);
      const body = result.rows;
      res.json({ success: true, items: { headers, body } });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const putProjects = async (req, res) => {
  try {
    const { project } = req.body;
    const { name, cost, department_id, date_beg, date_end, date_end_real } =
      project;
    const result = await db.query(
      "INSERT INTO public.projects (name, cost, department_id, date_beg, date_end, date_end_real) VALUES ($1, $2, $3, $4, $5, $6)",
      [name, cost, department_id, date_beg, date_end, date_end_real]
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

const updateProjects = async (req, res) => {
  const { project } = req.body;
  const result = await db.query(
    `UPDATE public.projects
      SET name = $1,
          cost = $2,
          department_id = $3,
          date_beg = $4,
          date_end = $5,
          date_end_real = $6
      WHERE id = $7;`,
    [
      project.name,
      project.cost,
      project.department_id,
      project.date_beg,
      project.date_end,
      project.date_end_real,
      project.id,
    ]
  );
  if (result) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
};

const deleteProjects = async (req, res) => {
  try {
    const { projectsIds } = req.body;
    console.log(projectsIds);
    const projectsIdsString = projectsIds.join(", ");
    const result = await db.query(
      `DELETE FROM public.projects WHERE id IN (${projectsIdsString});`
    );
    console.log(result);
    if (result) {
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

module.exports = {
  getProjects,
  putProjects,
  updateProjects,
  deleteProjects,
};
