require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const {
  ClerkExpressRequireAuth,
  clerkClient,
} = require("@clerk/clerk-sdk-node");

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

function logRoute(req, res, next) {
  console.log("GET", req.path, "at", new Date().toLocaleTimeString());
  if (req.path === "/profile") {
    return res.status(402).json({ message: "Not allowed" });
  }
  req.koalaUser = "Herbert";
  next();
}

app.get("/", (_, res) => {
  res.json({ message: "Welcome to the Auth Demo" });
});

app.get("/profile", ClerkExpressRequireAuth(), (_, res) => {
  return res.json({ name: "Ralf", age: 55, city: "Bonn" });
});

app.listen(port, () => {
  console.log(`auth-demo-api running on port ${port}`);
});
