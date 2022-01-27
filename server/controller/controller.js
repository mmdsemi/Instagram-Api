const { validationResult } = require("express-validator");
const con = require("../database/connection");
var moment = require("moment-jalaali");

exports.Auth_register = async (req, res) => {
  const validate_result = validationResult(req);
  if (validate_result.isEmpty()) {
    const {
      name,
      familyname,
      group_name,
      senior_id,
      username,
      phonenumber,
      password,
    } = req.body;
    const Reg_Time = new Date();
    const user_informations = [
      [
        name,
        familyname,
        group_name,
        senior_id,
        username,
        phonenumber,
        password,
        "subset",
        Reg_Time,
        "not_active",
      ],
    ];
    await con.query(
      "INSERT INTO users (name , family , group_name , senior_id ,username, phone_number , password , user_type , registered_time , active_status)  VALUES ?",
      [user_informations]
    );
    res.status(201).json(validate_result);
  } else {
    res.status(401).json(validate_result);
  }
};

exports.Auth_senior_register = async (req, res) => {
  const validate_result = validationResult(req);
  if (validate_result.isEmpty()) {
    const { name, familyname, group_name, tag_name, username, password } =
      req.body;
    const Reg_Time = new Date();
    const user_informations = [
      [
        name,
        familyname,
        group_name,
        tag_name,
        username,
        password,
        "senior",
        Reg_Time,
        "not_active",
      ],
    ];
    await con.query(
      "INSERT INTO users (name , family , group_name ,tag_name, username , password , user_type , registered_time , active_status)  VALUES ?",
      [user_informations]
    );
    res.status(201).json(validate_result);
  } else {
    res.status(401).json(validate_result);
  }
};

exports.Auth_login = async (req, res) => {
  const { username, password } = req.body;

  const { results: user } = await con.query(
    "SELECT * FROM users WHERE username='" +
      username +
      "' AND password ='" +
      password +
      "'"
  );

  if (user.length) {
    if (user[0].active_status == "active") {
      req.session.loggedin = true;
      res.redirect("/");
    } else {
      req.session.not_active_log = true;
      req.session.user = user[0];
 
      res.redirect("/not_active");
    }
  } else {
    res.status(401).render("auth/login", {
      layout: false,
      msg: "نام کاربری یا رمز عبور اشتباه است",
    });
  }
};
