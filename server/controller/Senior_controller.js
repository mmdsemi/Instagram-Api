const con = require("../database/connection");

exports.Accept_admin = async (req, res) => {
  const Acc_user = req.params.id;
  const { results: user } = await con.query(
    "UPDATE users SET active_status = 'active' WHERE id = '" + Acc_user + "'"
  );
  res.status(201).end();
};
