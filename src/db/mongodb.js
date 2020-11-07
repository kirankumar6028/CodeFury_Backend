const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/codeFurydata", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
