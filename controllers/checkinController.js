const db = require("../db");

// CREATE check-in
exports.createCheckin = async (req, res) => {
  try {
    const {
      pic,
      starttime,
      endtime,
      out,
      phonenumber,
      name,
      carnumber,
      gatekeeperuid,
      location
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO checkins 
      (pic, starttime, endtime, out_status, phonenumber, name, carnumber, gatekeeperuid, location)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [pic, starttime, endtime, out, phonenumber, name, carnumber, gatekeeperuid, location]
    );

    res.json({ message: "Check-in created", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// FETCH all check-ins
exports.getCheckins = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM checkins ORDER BY starttime DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};