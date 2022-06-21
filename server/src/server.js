const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
//needed for file names of images
const crypto = require('crypto');
//for images 1
const bodyParser = require('body-parser');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');


const api = require('./routes');
const { isAuthenticated } = require('./middlewares');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve('.env') });
}

const app = express();
app.use(cors());
// leave this here...
require('./services/passport')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

//for images 2: Middleware 
app.use(bodyParser.json())
//enables us to use a query string when we make a delete request to form
app.use(methodOverride('_method'))

// connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('\x1b[35m', '🔥 MongoDB successfully connected 🔥', '\x1b[35m');
  })
  .catch((err) => {
    console.log('err :>> ', err);
  });
const conn = mongoose.createConnection(process.env.MONGODB_URI)

let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db,mongoose.mongo)
  gfs.collection('images');
})
   

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGODB_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err){
         return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'images'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });
// @route POST /upload
// @desc Uplaods file to DB
// can upload multiple files with multer - array 
//'file' is the name of file in the form 
app.post('/upload', upload.single('file'), ((req, res) => {
  res.json({ file: req.file });
}));

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/', (req, res) => {
  res.send('Nothing to see here...');
});
app.use('/api', api);
//app.use(isAuthenticated);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(
    '\x1b[35m',
    `👋 Server is running on http://localhost:${PORT} 👋`,
    '\x1b[35m'
  );
});
