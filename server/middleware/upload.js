const path = require("path");
const multer = require("multer");
// const GridFsStorage = require("multer-gridfs-storage");

// const storage = new GridFsStorage({
//     url: process.env,
//     options: {useNewUrlParser: true, useUnifiedTopology: true},
//     file: (req, file) => {
//         const match = ["image/png", "image/jpeg"]
//         if (match.indexOf(file.mimetype) === -1) {
//             const filename = `${Date.now()}-any-name-${file.originalname}`;
//             return filename
//         }
//         return {
//             bucketName: 'uploads',
//             filename: `${Date.now()}-any-name-${file.originalname}`
//         }
//     }
// })

// module.exports = multer({storage});



const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

const fileFilter = function(req, file, callback) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        callback(null, true);
    } else {
        console.log("Only PNG and JPG files are allowed.");
        callback(null, false);
    }
};

const limits = {
    fileSize: 1024 * 1024 * 2 // 2MB limit
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
});

module.exports = upload;







// const path = require("path")
// const multer = require("multer")

// var storage = multer.diskStorage({
//     destination: function(req, file,cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function(req, file, cb) {
//         let ext = path.extname(file.originalname)
//         cb(null, Date.now() + ext)
//     }
// })

// var upload = multer({ 
//     storage: storage,
//     fileFilter: function (req, file, callback) {
//         if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
//             callback(null, true)
//         } else {
//             console.log("only png and jpg allowed");
//         }
//     },
//     limits: {
//         fileSize: 1024 * 1024 * 2
//     }
// })

// module.exports = upload
