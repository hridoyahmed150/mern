const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const app = express();

// DB connection
const db = require('./config/key').mongoURI;


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

app.get('/', (req, res) => res.send('work'));


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server run on port ${port}`));