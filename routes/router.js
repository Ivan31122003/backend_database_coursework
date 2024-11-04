const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const dataController = require("../controllers/dataController");
const adminController = require("../controllers/adminController");
const { checkRights } = require("../security/security.js");

router.post("/auth", authController.authenticateUser);
router.get("/employees/get", dataController.getEmployees);
router.get("/departments/get", dataController.getDepartments);
router.get(
  "/departments_employees/get",
  dataController.getDepartmentsEmployees
);
router.get("/users/get", checkRights, adminController.getUsers);

module.exports = router;
