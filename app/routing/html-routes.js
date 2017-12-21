//Dependency
var path = require('path');
//route
module.exports = function(app){

//GET request 
	app.get('/survey', function(request, results){
		results.sendFile(path.join(__dirname + '/../public/survey.html'));
	});

	// If no matching route is found default to home
	app.use(function(request, results){
		results.sendFile(path.join(__dirname + '/../public/home.html'));
	});

}