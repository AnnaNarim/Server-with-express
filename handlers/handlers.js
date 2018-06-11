const path = require('path');
const bodyParser = require('body-parser');

const Handlers = {};
module.exports = Handlers;

const arrayOfPeople = [];
let username = '';
let pas = '';
let gender = '';
let agree = false;

Handlers.hello = (request, response) =>{
	response.end('Hello World');
}

Handlers.time = (request, response) =>{
	let time = new Date();
	let hour = time.getHours();
	let minute = time.getMinutes();
	let second = time.getSeconds();
	response.end(hour + ":" + minute + ":" +second);
};

Handlers.formRender = (request, response) => {
	response.sendFile('C:/Users/Пользователь/Desktop/Start/TryingServer/form.html');
};

Handlers.result =  (request, response) => {
	response.render( 'result', {arr : arrayOfPeople});
};
 
Handlers.formPost = (request, response) => {
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
};

Handlers.apiTime = (request, response) => {
	let current_time = new Date();
	let hour = current_time.getHours();
	let minute = current_time.getMinutes();
	let second = current_time.getSeconds();
	let currTime = hour + ":" + minute + ":" +second;

	response.end(JSON.stringify({	
		time: currTime
	}) );
};

Handlers.apiUsersPost = (request, response) => {
	username = request.body.username;
	pas = request.body.password;
	gender = request.body.gender;
	agree = request.body.agree
	
	arrayOfPeople.push({ username: username , password: pas, gender: gender, agree: agree})
	console.log(arrayOfPeople)
	response.end('posted');
};

Handlers.apiUsers = (request, response) => {
	response.end(JSON.stringify(arrayOfPeople));
};