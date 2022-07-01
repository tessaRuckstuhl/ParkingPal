//https://www.youtube.com/watch?v=3f5Q9wDePzY
//https://www.youtube.com/watch?v=OvbRLY1QRIk
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const router = require('express').Router();
//needed for file names of images
const crypto = require('crypto');
require('dotenv').config();
//for images 1

const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');



const conn = mongoose.createConnection(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})

let gfs;
conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db)
})

// Create storage engine
const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    options: { useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                };
                resolve(fileInfo);
            });
        });
    }
});
const store = multer({
    storage,
    limits: { fileSize: 20000000 },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
});

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|PNG|JPG/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    //null as error
    if (mimetype && extname) return cb(null, true);
    //pass error message to callback function 
    cb('filetype');
}

const uploadMiddleware = (req, res, next) => {
    const upload = store.single('file');
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).send('File too large');
        } else if (err) {
            if (err === 'filetype') return res.status(400).send('Image files only');
            return res.sendStatus(500);
        }
        next();
    })
}

// @route POST /upload
// @desc Uplaods file to DB
// can upload multiple files with multer - array 
//'file' is the name of file in the form 
router.post('/upload', uploadMiddleware, async (req, res) => {
    const { file } = req;
    const { id } = file;
    if (file.size > 5000000) {
        deleteImage(id, file);
        return res.status(400).send('file may not exceed 5mb')
    }
    console.log("upload file: ", file)
    return res.send(file.id)
})

const deleteImage = (id) => {
    if (!id || id === 'undefined') return res.status(400).send('no image id');
    const _id = new mongoose.Types.ObjectId(id);
    gfs.delete(_id, (err) => {
        if (err) return res.status(500).send('image deletion error');
    });
};


router.get('/:id', ({ params: { id } }, res) => {
    if (!id || id === 'undefined') return res.status(400).send('no image id');
    const _id = new mongoose.Types.ObjectId(id);
    gfs.find({_id}).toArray((err, files) => {
        if (!files || files.length === 0) 
            return res.status(400).send('no files exist')
        gfs.openDownloadStream(_id).pipe(res);
    })
})

router.delete('/:id', ({ params: { id } }, res) => {
   deleteImage(id)
})


module.exports = router;