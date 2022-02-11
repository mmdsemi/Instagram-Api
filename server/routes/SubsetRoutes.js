const express = require("express");
const router = express.Router();
const services = require("../services/services");
const controller = require("../controller/AuthController");
const { check } = require("express-validator");
const con = require("../database/connection");

router.get("/subset", services.Subset_Dashboard);

module.exports = router;
