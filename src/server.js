const express = require("express");
const cors = require("cors")({ origin: true });
const helmet = require("helmet");
const morgan = require('morgan');
const bearerAuth = require("./lib/bearer-auth");
const requireAuth = require("./lib/require-auth");
const path = require("path");

const app = express();

app.use(cors);
// app.options("*", cors());
// app.use(
//   cors({
//     origin: true
//   })
// );
app.use(helmet());
app.use(express.json());
app.use(morgan('tiny'));

// require router files
const authRouter = require("./routes/auth/");
const propertyRouter = require("./routes/properties/property-router.js");

app.use("/api/auth", authRouter);

// Base Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/properties", propertyRouter);

app.get("/hello", (_req, res) => {
  res.send("Hello, world");
});

app.get("/protected", bearerAuth, requireAuth, (req, res) => {
  res.send(`Yay! your email is ${req.user}`);
});

module.exports = app;
