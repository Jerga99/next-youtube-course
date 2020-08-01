const multer = require('multer');

const ALLOWED_FORMAT = ['image/jpeg', 'image/png', 'image/jpg'];

const storage = multer.memoryStorage();
exports.upload = multer({
  storage,
  fileFilter: function(req, file, cb) {
    if (ALLOWED_FORMAT.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Not supported file format!'), false);
    }
  }
});
