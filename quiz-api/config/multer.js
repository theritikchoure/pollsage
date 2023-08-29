const multer = require('multer');
const path = require('path');

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/temp/'); // Upload files to the "uploads" directory
  },
  filename: function (req, file, cb) {
    // Rename the file to avoid name conflicts
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});

// Create a Multer instance with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
