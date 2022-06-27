const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const bodyParser = require('body-parser');
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
