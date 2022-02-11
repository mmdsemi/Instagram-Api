const { validationResult } = require("express-validator");
const con = require("../database/connection");

exports.Change_pass = async (req, res) => {
  const validate_result = validationResult(req);
  const V_results = validate_result.array();

  if (validate_result.isEmpty()) {
    const { oldpass, newpass } = req.body;
    const User_Info = req.session.User[0].username;
    const { results: pass } = await con.query(
      "SELECT * FROM users WHERE password ='" +
        oldpass +
        "' && username = '" +
        User_Info +
        "' "
    );
    if (pass.length) {
      await con.query(
        "UPDATE users SET password = '" +
          newpass +
          "' WHERE password = '" +
          oldpass +
          "' && username = '" +
          User_Info +
          "'  "
      );
      res.status(201).json(V_results);
    } else {
      V_results.push({ msg: "پسورد قبلی درست نیست" });
      res.status(401).json(V_results);
    }
  } else {
    res.status(401).json(V_results);
  }
};

exports.Change_info = async (req, res) => {
    const validate_result = validationResult(req);
  
    if (validate_result.isEmpty()) {
      const { changename, changefamily, changegroup } = req.body;
      const USER_ID = req.session.User[0].id.toString();
      con.query(
        "UPDATE users SET name = '" +
          changename +
          "' , family = '" +
          changefamily +
          "' , group_name = '" +
          changegroup +
          "' WHERE id = '" +
          USER_ID +
          "'  "
      );
      res.status(201).json(validate_result);
    } else {
      res.status(401).json(validate_result);
    }
  };