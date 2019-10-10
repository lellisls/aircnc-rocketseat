const multer = require("multer");
const path = require("path");

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "uploads"),
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.resolve(__dirname, "..", "..", "uploads"));
    },
    filename: (req, file, callback) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);

      callback(null, `${name}-${Date.now()}${ext}`);
    }
  })
};
