// require('dotenv').config();
import multer from "multer";
const multerStorage = multer.diskStorage({
    destination: "./src/uploads",
    filename(req: any, file, callback) {
        const userid = req.body.userid;

        //returning imageName
        const imageName = `${userid}-${Date.now()}-${file.originalname}`;
        req.body.uploadTime = Date.now();
        file.originalname = imageName;
        callback(null, imageName);
    },
})
export default multerStorage;

// const { MulterError } = require('multer');
// const multer = require('multer');
// const multerStorage = multer.diskStorage({
//     destination: './src/All_Post',
//     filename: (req, file, cb) => {
//         // console.log('file', file);
//         const userid = req.query.userid;

//         //returning imageName
//         const imageName = `${userid}-${Date.now()}-${file.originalname}`;
//         req.uploadTime = Date.now();
//         file.originalname = imageName;
//         cb(null, imageName);
//     },
// });

// module.exports = multerStorage;