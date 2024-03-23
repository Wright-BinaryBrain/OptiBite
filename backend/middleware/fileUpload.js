const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, "./files/image");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
    console.log(file);
  },
});

const filter = function (res, file, cb) {
  console.log(file);
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only png, jpeg and jpeg format are allowed!"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filter,
});

module.exports = upload;
