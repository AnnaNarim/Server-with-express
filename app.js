const express = require ('express');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');

const app = express();

app.listen(3000, ()=> {
	console.log("server is listening");
});

app.use(bodyParser.urlencoded({ extended : false}));
app.set('view engine', "pug");

app.use('/', routes);


