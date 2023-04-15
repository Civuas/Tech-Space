require("dotenv").config();

const express = require("express");
const router = require("./routes");
const DBConnect = require("./database");

const PORT = process.env.PORT || 5500;
DBConnect();

const app = express();
app.use(express.json());
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
