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

const data = [
  {
    user: "user_2kaxtz0A75LJZwiByvLtXIqFcSj",
    comment: "Das ist toll!",
  },
];

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

app.get("/profile", ClerkExpressRequireAuth(), async (req, res) => {
  console.log(req.auth.claims.sub);
  const userData = data.find(
    (userRecord) => userRecord.user === req.auth.claims.sub
  );
  // const user = await clerkClient.users.getUser(req.auth.claims.sub);
  return res.json(userData);
});

app.listen(port, () => {
  console.log(`auth-demo-api running on port ${port}`);
});
