const express = require('express');
const app = express();
var cors = require('cors')
const mongoose = require('mongoose');
require('dotenv/config');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

// Import Routes
const postRoutes = require('./routes/posts');
app.use('/posts', postRoutes);

const bookRoutes = require('./routes/book');
app.use('/book', bookRoutes);

const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

// Middleware
app.use('/', () => {
    console.log('Middleware Running');
});


// ROUTES

// Connect to db
mongoose
  .connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true})
  .then(() => console.log("Database connected!"))
  .catch(err => console.log(err));


if (process.env.NODE_ENV === "production") {
  const pathToClientBuild = path.join(__dirname, '..', 'path', 'to', 'client', 'build');
  app.use(express.static(pathToClientBuild));

  /**
   * experiment with '/' and '/*' and see what works best for you
  */
  app.get('/*', function (req, res) {
    res.sendFile(path.join(pathToClientBuild, 'index.html'));
  });
}

app.listen(5000);