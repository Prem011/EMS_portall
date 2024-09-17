const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/images/employeesDp'))
    },
    filename: function (req, file, cb) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + path.extname(file.originalname).toLowerCase())
    }
  })

  const fileFilter  = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if(allowedTypes.includes(file.mimetype)){
      cb(null, true);
    }
    else{
      cb(new Error("only .jpg .jpeg, and .png files are allowed!"), false);
    }
  }
  
  const upload = multer({
     storage: storage,
    limits: {fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter 
  })

  module.exports = upload;
