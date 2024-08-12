require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (_, res) => {
  res.json({ message: "Welcome to the Auth Demo" });
});

app.get("/profile", (_, res) => {
  return res.json({ name: "Ralf", age: 55, city: "Bonn" });
});

app.listen(port, () => {
  console.log(`auth-demo-api running on port ${port}`);
});
