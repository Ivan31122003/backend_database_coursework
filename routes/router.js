const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");

const employeesController = require("../controllers/employeesController");
const departmentsController = require("../controllers/departmentsController");
const projectsController = require("../controllers/projectsController.js");
const departmentsEmployeesController = require("../controllers/departmentsEmployeesController");

const { checkRights } = require("../security/security.js");

router.use(express.json());

// auth
router.post("/auth", authController.authenticateUser);

// employees
router.post("/employees/get", checkRights, employeesController.getEmployees);
router.post("/employees/put", checkRights, employeesController.putEmployees);
router.post(
  "/employees/update",
  checkRights,
  employeesController.updateEmployees
);
router.post(
  "/employees/delete",
  checkRights,
  employeesController.deleteEmployees
);

// departmenst
router.post(
  "/departments/get",
  checkRights,
  departmentsController.getDepartments
);
router.post(
  "/departments/put",
  checkRights,
  departmentsController.putDepartments
);
router.post(
  "/departments/update",
  checkRights,
  departmentsController.updateDepartments
);
router.post(
  "/departments/delete",
  checkRights,
  departmentsController.deleteDepartments
);

// projects
router.post("/projects/get", checkRights, projectsController.getProjects);
router.post("/projects/put", checkRights, projectsController.putProjects);
router.post("/projects/update", checkRights, projectsController.updateProjects);
router.post("/projects/delete", checkRights, projectsController.deleteProjects);

// departmentsEmployees
router.post(
  "/departments_employees/get",
  checkRights,
  departmentsEmployeesController.getDepartmentsEmployees
);
router.post(
  "/departments_employees/put",
  checkRights,
  departmentsEmployeesController.putDepartmentsEmployees
);
router.post(
  "/departments_employees/update",
  checkRights,
  departmentsEmployeesController.updateDepartmentsEmployees
);
router.post(
  "/departments_employees/delete",
  checkRights,
  departmentsEmployeesController.deleteDepartmentsEmployees
);

// admin
router.post("/users/get", checkRights, adminController.getUsers);

module.exports = router;
