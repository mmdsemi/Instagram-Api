const express = require("express");
const router = express.Router();
const services = require("../services/services");
const controller = require("../controller/AuthController");
const { check } = require("express-validator");

router.get("/", services.homeroutes);
router.get("/login", services.login);
router.get("/register", services.register);
router.get("/logout", (req, res) => {
  res.redirect("/login");
  req.session.destroy();
});

router.get("/not_active", services.not_active);
router.post(
  "/register",
  [
    check("name", "اسم را خالی نزارید").not().isEmpty(),
    check("familyname", "فامیل را خالی نگزارید").not().isEmpty(),
    check("group_name", "نام گروه را خالی نگزارید").not().isEmpty(),
    check("senior_id", " ادمین ارشد خود را انتخاب کنید").not().isEmpty(),
    check("username", "نام کاربری را خالی نگزارید").not().isEmpty(),
    check("phonenumber", "شماره تلفن درستی وارد کنید")
      .exists()
      .isLength({ min: 11 }),
    check("password", "پسورد درستی وارد کنید").exists().isLength({ min: 6 }),
  ],
  controller.Auth_register
);
router.post(
  "/register/senior",
  [
    check("name", "اسم را خالی نزارید").not().isEmpty(),
    check("familyname", "فامیل را خالی نگزارید").not().isEmpty(),
    check("group_name", "نام گروه را خالی نگزارید").not().isEmpty(),
    check("tag_name", "نام تگ را خالی نگزارید").not().isEmpty(),
    check("username", "نام کاربری را خالی نگزارید").not().isEmpty(),

    check("password", "پسورد درستی وارد کنید").exists().isLength({ min: 6 }),
  ],
  controller.Auth_senior_register
);

router.post("/login", controller.Auth_login);

module.exports = router;
