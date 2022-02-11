const con = require("../database/connection");

exports.homeroutes = async (req, res) => {
  if (!req.session.loggedin_senior || !req.session.loggedin_subset) {
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

exports.Senior_Dashboard = (req, res) => {
  if (req.session.loggedin_senior) {
    res.render("Senior_views/index", {
      layout: "layouts/senior_header",
      user: req.session.User,
    });
  } else {
    res.render("auth/not_found", { layout: false });
  }
};

exports.Subset_Dashboard = (req, res) => {
  if (req.session.loggedin_subset) {
    res.render("Subset_views/index", {
      layout: "layouts/subset_header",
      user: req.session.User,
    });
  } else {
    res.render("auth/not_found", { layout: false });
  }
};
exports.Change_password = (req, res) => {
  if (req.session.loggedin_senior) {
    res.render("settings/change_password", {
      layout: "layouts/senior_header",
      user: req.session.User,
    });
  } else if (req.session.loggedin_subset) {
    res.render("settings/change_password", {
      layout: "layouts/subset_header",
      user: req.session.User,
    });
  } else {
    res.redirect("/login");
  }
};
exports.Change_info = (req, res) => {
  if (req.session.loggedin_senior) {
    res.render("settings/change_information", {
      layout: "layouts/senior_header",
      user: req.session.User,
    });
  } else if (req.session.loggedin_subset) {
    res.render("settings/change_information", {
      layout: "layouts/subset_header",
      user: req.session.User,
    });
  } else {
    res.redirect("/login");
  }
};

exports.Active_new_admin = async (req, res) => {
  if (req.session.loggedin_senior) {
    const User_info = req.session.User[0].id.toString();

    const { results: Ac_admin } = await con.query(
      "SELECT * FROM users WHERE senior_id = '" +
        User_info +
        "' && active_status = 'not_active'"
    );
    res.render("Senior_views/activate_new_admin", {
      layout: "layouts/senior_header",
      user: req.session.User,
      Not_active_user: Ac_admin,
    });
  } else {
    res.redirect("/login");
  }
};

exports.All_admins = async (req, res) => {
  if (req.session.loggedin_senior) {
    const User_info = req.session.User[0].id.toString();
    const { results: allsub } = await con.query(
      "SELECT * FROM users WHERE senior_id = '" + User_info + "'"
    );
    res.render("Senior_views/all_admins", {
      layout: "layouts/senior_header",
      user: req.session.User,
      All_subs: allsub,
    });
  } else {
    res.redirect("/login");
  }
};

exports.Admin_information = async (req, res) => {
  if (req.session.loggedin_senior) {
    const Admin_ID = req.query.id;
    [[Admin_ID]];
    const { results: admin } = await con.query(
      "SELECT * FROM users WHERE id = ?",
      [Admin_ID]
    );
    if (Admin_ID && admin.length > 0) {
      res.render("Senior_views/admin_information", {
        layout: "layouts/senior_header",
        user: req.session.User,
        admin_info: admin,
      });
    } else {
      res.redirect("/senior");
    }
  } else {
    res.redirect("/login");
  }
};
