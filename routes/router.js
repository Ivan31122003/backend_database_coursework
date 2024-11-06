const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const dataController = require("../controllers/dataController");
const adminController = require("../controllers/adminController");
const { checkRights } = require("../security/security.js");

router.use(express.json());

router.post("/auth", authController.authenticateUser);
router.post("/employees/get", checkRights, dataController.getEmployees);
router.post("/departments/get", checkRights, dataController.getDepartments);
router.post(
  "/departments_employees/get",
  checkRights,
  dataController.getDepartmentsEmployees
);
router.post("/users/get", checkRights, adminController.getUsers);

module.exports = router;
