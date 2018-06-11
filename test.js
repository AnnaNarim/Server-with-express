/*Create an express web application that has the following features
Renders a page with "Hello world" on "/" route
Renders current time on "/time" route
Renders a page for route "/form" with a html form (method=post, action=/form) with inputs (username, password, gender, "agree with" checkbox).
The POST /form route should save data to the global array and redirects (res.redirect('/result')) to the /result route with all data saved.
Have following api endpoints
    GET /api/time - returns current time in {time: current_time} format
    POST /api/users - accepts user data in following format {username: String, gender: String, agree: Boolean, password: String} and saves to the array
    GET /api/users - returns the array of users in json format
 */  
const express = require ('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.listen(3000, ()=> {
	console.log("server is listening");
});

app.use(bodyParser.urlencoded({ extended : false}));
app.set('view engine', "pug");

const arrayOfPeople = [];
let username = '';
let pas = '';
let gender = '';
let agree = false;

app.get('/', (request, response) => {
	response.end('Hello world');
});

app.get('/time', (request, response) =>{
	let time = new Date();
	let hour = time.getHours();
	let minute = time.getMinutes();
	let second = time.getSeconds();
	response.end(hour + ":" + minute + ":" +second);
});

app.get('/form', (request, response) => {
	response.sendFile(path.join(__dirname + '/form.html'));
});

app.get('/result', (request, response) => {
	response.render( 'result', {arr : arrayOfPeople});
});

app.post('/form', (request, response) => {
	username = request.body.usernameInput;
	pas = request.body.pasInput;
	gender = request.body.select;
	agree = request.body.agree;
	if (agree){
		arrayOfPeople.push({ username: username , password: pas, gender: gender, agree: "true"})
		//console.log("username is " + username + " "+ pas + " "+ gender + " agreed");
	}
	else {
		arrayOfPeople.push({ username: username , password: pas, gender: gender, agree: "false"})
		//console.log("username is " + username + " "+ pas + " "+ gender + " not agreed");
	}
	console.log(arrayOfPeople)
	response.redirect('/result');
});

app.get( '/api/time', (request, response) => {
	let current_time = new Date();
	let hour = current_time.getHours();
	let minute = current_time.getMinutes();
	let second = current_time.getSeconds();
	let currTime = hour + ":" + minute + ":" +second;

	response.end(JSON.stringify({	
		time: currTime
	}) );
});

app.post('/api/users', (request, response) => {
	username = request.body.username;
	pas = request.body.password;
	gender = request.body.gender;
	agree = request.body.agree
	
	arrayOfPeople.push({ username: username , password: pas, gender: gender, agree: agree})
	console.log(arrayOfPeople)
	response.end('posted');
});

app.get('/api/users', (request, response) => {
	response.end(JSON.stringify(arrayOfPeople));
});

