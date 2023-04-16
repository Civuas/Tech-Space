require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const router = require("./routes");
const DBConnect = require("./database");

const PORT = process.env.PORT || 5500;
DBConnect();

const app = express();

app.use(cookieParser());
const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOption));
app.use("/storage", express.static("storage"));

app.use(express.json({ limit: "8mb" }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(router);

app.get("/", (req, res) => {
  res.send("Hello from express js");
});

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
