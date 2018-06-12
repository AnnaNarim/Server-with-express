const path = require('path');
const moment = require('moment');
const bodyParser = require('body-parser');

const Handlers = {};
module.exports = Handlers;

const arrayOfPeople = [];

Handlers.hello = (request, response) =>{
	response.end('Hello World');
}

Handlers.time = (request, response) =>{
    const time = moment().format("HH:mm:ss"); 
	response.end(time);
};

Handlers.formRender = (request, response) => {
	response.render('form');
};

Handlers.result =  (request, response) => {
	response.render( 'result', {arr : arrayOfPeople});
};
 
Handlers.formPost = (request, response) => {
	request.check('username').notEmpty().withMessage('Username field is empty');
	request.check('password').notEmpty().withMessage('Password field is empty');
	const errors = request.validationErrors();
	if(errors){
		response.render('form', {errors});
	}
	else {
		const { username, password, gender,agree } = request.body;
		arrayOfPeople.push({ username, password, gender, agree: agree ? "true" : "false"});
		response.redirect('/result');
	}
};

Handlers.apiTime = (request, response) => {
	const time = moment().format("HH:mm:ss");
	response.end(JSON.stringify({time}));
};

Handlers.apiUsersPost = (request, response) => {
	request.check('username').notEmpty().withMessage('Username field is empty');
	request.check('password').notEmpty().withMessage('Password field is empty');
	const errors = request.validationErrors();

	if(errors){
		errors.forEach((elem) =>{
			response.write(elem.msg + "\n");
		});
		response.end();
	}
	else {
		const { username, password, gender,agree } = request.body;
		arrayOfPeople.push({ username, password, gender, agree});
		response.end('posted');
	}
};

Handlers.apiUsers = (request, response) => {
	response.end(JSON.stringify(arrayOfPeople));
};