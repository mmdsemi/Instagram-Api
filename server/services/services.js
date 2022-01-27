const con = require("../database/connection");

exports.homeroutes = async (req, res) => {
  if (req.session.loggedin) {
    res.render("index", { layout: "layouts/subset_header" });
  } else {
    res.redirect("/login");
  }
};

exports.login = (req, res) => {
  res.render("auth/login.ejs", { layout: false });
};

exports.register = async (req, res) => {
  const { results: seniors } = await con.query(
    "SELECT * FROM users WHERE user_type = 'senior'"
  );

  res.render("auth/register.ejs", { layout: false, seniors });
};
exports.not_active = (req, res) => {
  if (req.session.not_active_log) {
    res.render("not_active", {
      layout: "layouts/not_active_user",
      user_info: req.session.user,
    });
  } else {
    res.redirect("/login");
  }
};
