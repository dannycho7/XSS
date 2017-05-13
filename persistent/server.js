const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.Promise = require('bluebird');

let commentSchema = mongoose.Schema({
  comment: String
});

let Comment = mongoose.model('Comment', commentSchema);

mongoose.connect('mongodb://localhost/persistent').then(() => {
  console.log("Connected to mongodb server");
}).catch((err) => {
  console.log("Could not connect to mongodb server");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', __dirname);

app.get('*', (req, res) => {
  Comment.find((err, comments) => {
    res.locals.comments = comments;
    return res.render('index');
  });
});

app.post('/comment', (req, res) => {
  console.log('received:',req.body.comment);
  var input = new Comment({
    comment: req.body.comment
  });
  input.save((err, input) => {
    if (err) throw err;
    console.log("Successfully saved new comment");
    res.redirect('/');
  });
});

app.listen(5000, (err) => {
  console.log("Server listening in on port 5000");
});
