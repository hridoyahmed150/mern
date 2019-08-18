const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const app = express();

// body-parser middleware use

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json())

// DB connection
const db = require('./config/key').mongoURI;

app.use(passport.initialize());

require('./config/passport')(passport)

// route define

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

mongoose.connect(db)
  .then(() => {
    console.log('connecetd')
  })
  .catch((err) => {
    console.log(err)
  })




const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server run on port ${port}`));