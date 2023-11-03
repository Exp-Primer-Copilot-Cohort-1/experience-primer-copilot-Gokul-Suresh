// Create web server 
// http://localhost:3000/comments

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var path = require('path');

var COMMENTS_FILE = path.join(__dirname, 'comments.json');

// Set up the body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set up the static directory
app.use(express.static(path.join(__dirname, 'public')));

// Get the comments
app.get('/comments', function(req, res){
	fs.readFile(COMMENTS_FILE, function(err, data){
		if(err){
			console.error(err);
			process.exit(1);
		}
		res.json(JSON.parse(data));
	});
});

// Add the comments
app.post('/comments', function(req, res){
	fs.readFile(COMMENTS_FILE, function(err, data){
		if(err){
			console.error(err);
			process.exit(1);
		}
		var comments = JSON.parse(data);
		var newComment = {
			id: Date.now(),

