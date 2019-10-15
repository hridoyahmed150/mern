const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');


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

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

mongoose.connect(db, {useNewUrlParser: true })
  .then(() => {
    console.log('connecetd')
  })
  .catch((err) => {
    console.log(err)
  })




const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server run on port ${port}`));