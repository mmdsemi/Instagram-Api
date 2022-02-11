const express = require("express");
const router = express.Router();
const services = require("../services/services");
const controller = require("../controller/Senior_controller");

const { check } = require("express-validator");
const con = require("../database/connection");

router.get("/senior", services.Senior_Dashboard);
router.get("/senior/active_admin", services.Active_new_admin);
router.put("/senior/active_admin/:id", controller.Accept_admin);
router.get("/senior/all_admins", services.All_admins);
router.get("/senior/admin_information", services.Admin_information);

module.exports = router;
