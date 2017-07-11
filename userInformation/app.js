// Create a Node.js application that is the beginning of a
 // user management system. Your users are all saved in a
 //  "users.json" file, and you can currently do the following:
// - search for users
// - add new users to your users file.
// - get your starter file here: users.json

// Part 0
// Create one route:
// - route 1: renders a page that displays all your users.

var express = require('express');
var fs = require('fs');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', function (req, res) {
	fs.readFile('./users.json', function (error, data) {
		if (error) {
			console.log(error);
		}
		var parsedData = JSON.parse(data);
		res.render('index', {users: parsedData});
	});
});

app.get('/form', function (req, res) {
	res.render('form');
});

app.post('/searchuser', function(req,res){
	fs.readFile('./users.json', function (error, data) {
		if (error) {
			console.log(error);
		}
		var jsonData = JSON.parse(data);
		JSON.stringify(req.body);
		var userSend = req.body;
		res.render('searchuser', {users: jsonData, user: userSend});
	});
	console.log(req.body)
});

app.get('/newuser', function (req, res) {
	res.render('newuser');
});

app.post('/newuser', function(req,res) {
	var firstname = req.body.fname
	var lastname = req.body.lname
	var email = req.body.email

	fs.readFile('./users.json', function (error, data) {
		if (error) {
			console.log(error);
		}
		var jsonDataNew = JSON.parse(data);
		JSON.stringify(jsonDataNew);

		jsonDataNew.push({ firstname: firstname, lastname: lastname, email: email });
		var newUser = JSON.stringify(jsonDataNew);

	 	fs.writeFile("./users.json", newUser, function(err) {
            if (err) {
                throw err;
            }
        })
		return res.redirect('/');
	});
});

var server = app.listen(3000, function () {
	console.log('Listening on port: ' + server.address().port);
});

// Part 1
// Create two more routes:
// - route 2: renders a page that displays a form which is
//  your search bar.
// // - route 3: takes in the post request from your form, 
// then displays matching users on a new page. Users should be 
// matched based on whether either their first or last name 
// contains the input string.

// Part 2
// Create two more routes:
// - route 4: renders a page with three forms on it 
// (first name, last name, and email) that allows you to 
// add new users to the users.json file.
// // - route 5: takes in the post request from the 'create user'
//  form, then adds the user to the users.json file. Once that 
//  is complete, redirects to the route that displays all your
//   users (from part 0).