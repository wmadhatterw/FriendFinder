 //require the friends data file
var friends = require('../data/friends.js');

//Routes
module.exports = function(app){

	// API GET Requests
	app.get('/api/friends', function(requests, results){
		results.json(friends);
	});

	// API POST Requests
	app.post('/api/friends', function(requests, results){
		// Comparing user with their best friend match
        // Create object to store the best match
		var bestMatch = {
			name: "",
			photo: "",
			friendDifference: 1000
		};

	 // Parse users survey results and POST it
		var userData 	= requests.body;
		var userName 	= userData.name;
		var userPhoto 	= userData.photo;
		var userScores 	= userData.scores;

		var totalDifference = 0;

		// Loop through all the friend possibilities in the database. 
		for  (var i=0; i< friends.length; i++) {

			console.log(friends[i].name);
			totalDifference = 0;

			// Loop through all the scores of each friend
			for (var j=0; j< friends[i].scores[j]; j++){

				// Calculate the difference between the scores and sum of them into the totalDifference
				totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

				// If the sum of differences is less then the differences of the current "best match"
				if (totalDifference <= bestMatch.friendDifference){

					// Reset the bestMatch to be the new friend. 
					bestMatch.name = friends[i].name;
					bestMatch.photo = friends[i].photo;
					bestMatch.friendDifference = totalDifference;
				}
			}
		}

		/// Save the users data to the database 
		friends.push(userData);

		// Return a JSON with the user's bestMatch
		results.json(bestMatch);

	});

}