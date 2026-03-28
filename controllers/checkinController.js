const db = require("../db");
const cloudinary = require("../config/cloudinary");

exports.createCheckin = async (req, res) => {
  try {
    const {
      starttime,
      endtime,
      out,
      phonenumber,
      name,
      carnumber,
      gatekeeperuid,
      location
    } = req.body;

    let imageUrl = "";

    // 🔥 Upload image if exists
    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "checkins" },
        async (error, result) => {
          if (error) {
            return res.status(500).json({ error: error.message });
          }

          imageUrl = result.secure_url;

          // Save in DB after upload
          const [dbResult] = await db.query(
            `INSERT INTO checkins 
            (pic, starttime, endtime, out_status, phonenumber, name, carnumber, gatekeeperuid, location)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              imageUrl,
              starttime,
              endtime,
              out,
              phonenumber,
              name,
              carnumber,
              gatekeeperuid,
              location,
            ]
          );

          return res.json({
            message: "Check-in created",
            id: dbResult.insertId,
            pic: imageUrl,
          });
        }
      );

      // convert buffer to stream
      const stream = result;
      stream.end(req.file.buffer);

    } else {
      // No image case
      const [dbResult] = await db.query(
        `INSERT INTO checkins 
        (pic, starttime, endtime, out_status, phonenumber, name, carnumber, gatekeeperuid, location)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          "",
          starttime,
          endtime,
          out,
          phonenumber,
          name,
          carnumber,
          gatekeeperuid,
          location,
        ]
      );

      return res.json({
        message: "Check-in created (no image)",
        id: dbResult.insertId,
      });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getCheckins = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM checkins ORDER BY starttime DESC");
    res.json(rows);
  } catch (err) {
    console.error("DB ERROR:", err); // 👈 add this
    res.status(500).json({ error: err.message });
    
  }
};
