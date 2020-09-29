const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
