const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/');
    },

    filename: function (req, file, cb){
        const uniqueName = Date.now() + "_" + file.originalname;
        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb)=>{
    const allowedTypes =  /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if(extname && mimetype){
        cb(null, true);
    } else{
        cb(new Error('Only jpg and png files are allowed'));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

module.exports = { upload };