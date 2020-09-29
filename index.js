require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
require("./src/db/mongodb");
const auth = require("./src/middleware/authUser");

//Routers
const userRouter = require("./src/routes/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);

app.get("", auth, (req, res) => {
  res.send(req.user);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, function () {
  console.log("Server is running on port " + port);
});