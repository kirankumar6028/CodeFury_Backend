const multer = require("multer");

// Image configuration
const fileFilter = (req, file, cb) => {
  // accepting only png and jpg files
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(new Error("Accepting only png and jpg which are less than 3mb"), false);
  }
};

// Image configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3, //can accept upto 3mb file
  },
  fileFilter: fileFilter,
});

var file = upload.single("img");

module.exports=file;
