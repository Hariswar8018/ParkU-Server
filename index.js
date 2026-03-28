const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const checkinRoutes = require("./routes/checkinRoutes");

app.use("/api/checkins", checkinRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Server is working");
});