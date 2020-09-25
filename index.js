const express = require("express");
const bodyParser = require("body-parser");

require("./src/db/mongodb");
const User = require("./src/db/user/user");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()); //converts req to req.json()

app.post("", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((user) => res.send(user))
    .catch((e) => res.send(e));
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, function () {
  console.log("Server is running on port " + port);
});
