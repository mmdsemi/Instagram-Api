const express = require("express");
const router = express.Router();
const services = require("../services/services");
const controller = require("../controller/Dashboard");
const { check } = require("express-validator");

router.get("/changepass", services.Change_password);
router.post(
  "/changepass",
  [
    check("oldpass", "پسورد قبلی  درستی وارد کنید")
      .exists()
      .isLength({ min: 6 }),
    check("newpass", "پسورد جدید درستی وارد کنید")
      .exists()
      .isLength({ min: 6 }),
  ],
  controller.Change_pass
);

router.get("/changeinfo", services.Change_info);

router.post(
  "/changeinfo",
  [
    check("changename", "اسم را خالی نزارید").not().isEmpty(),
    check("changefamily", "فامیل را خالی نگزارید").not().isEmpty(),
    check("changegroup", "نام گروه را خالی نگزارید").not().isEmpty(),
  ],
  controller.Change_info
);

module.exports = router;
