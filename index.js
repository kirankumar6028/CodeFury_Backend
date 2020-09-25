const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("config");

require("./src/db/mongodb");
const User = require("./src/db/user/user");
//const route = require("./middleware/router");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //converts req to req.json()
//app.use("/api/users", route); //to use router

app.post("/", async (req, res) => {


  
   //find an existing user
   let user = await User.findOne({ email: req.body.email });
   if (user) return res.status(400).send("User already registered.");
 
   user = new User({
     firstName : req.body.firstName,
     lastName : req.body.lastName,
     password: req.body.password,
     email: req.body.email
   });
   await user.save();

   //get the token from the header if present
   let token = req.headers["x-access-token"] || req.headers["authorization"];
   //if no token found, return response (without going to the next middelware)
   if (!token) return res.status(401).send("Access denied. No token provided.");
 
   try {
     //if can verify the token, set req.user and pass to next middleware
     const decoded = jwt.verify(token, config.get("myprivatekey"));
     req.user = decoded;
     next();
   } catch (ex) {
     //if invalid token
     res.status(400).send("Invalid token.");
   }

   token = user.generateAuthToken();
   res.header("x-auth-token", token).send({
     _id: user._id,
     firstName: user.firstName,
     lastName : user.lastName,
     email: user.email,
   });
 });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, function () {
  console.log("Server is running on port " + port);
});
