require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
require("./src/db/mongodb");
const auth = require("./src/middleware/authUser");
const cors=require("cors");

//Routers
const userRouter = require("./src/routes/user");
const workerRouter=require("./src/routes/workerInfo");
const workerMatch=require("./src/routes/workerMatching");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(workerRouter);
app.use(workerMatch);
app.use(cors());

app.get("", auth, (req, res) => {
  res.send(req.user);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, function () {
  console.log("Server is running on port " + port);
});
