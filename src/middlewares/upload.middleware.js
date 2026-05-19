const multer = require("multer");
const path = require("path");

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Images will be saved in the 'uploads' folder
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Create a unique filename: timestamp + original extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

/*
// File validation middleware (beginner friendly)
const fileFilter = (req, file, cb) => {
  // Only allow jpg and png
  const allowedTypes = /jpeg|jpg|png/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );

  if (mimetype && extname) {
    return cb(null, true);
  }

  // If validation fails
  cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
};

*/
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
  //fileFilter: fileFilter,
});

//Middleware wrapper to hanlde multer errors in this file

const fileUpload = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return next(err);
    }
    next();
  });
};

module.exports = fileUpload;
