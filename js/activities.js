function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	var tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	// Creating map of activities and their counts
	const activityCount = new Map();
	
	// Updating count of each activity in tweet_array
	for (let index = 0; index < tweet_array.length; index++) {
		var activityType = tweet_array[index].activityType;
		if (activityType != "unknown") {
			if (activityCount.has(activityType)) {
				activityCount.set(activityType, activityCount.get(activityType) + 1);
			} else {
				activityCount.set(activityType, 1);
			}
		}
	}
	
	// Putting # of activities
	document.getElementById('numberActivities').innerText = activityCount.size;

	// Sorting activities based on highest count
	const entries = Array.from(activityCount.entries());
	entries.sort((a, b) => b[1] - a[1]);
	
	// Logging top three activities based on frequency
	document.getElementById('firstMost').innerText = entries[0][0];
	document.getElementById('secondMost').innerText = entries[1][0];
	document.getElementById('thirdMost').innerText = entries[2][0];

	// getting average distance of each activity
	const activityDistances = new Map();

	// Updating count of each activity in tweet_array
	for (let index = 0; index < tweet_array.length; index++) {
		var activityType = tweet_array[index].activityType;
		var distance = tweet_array[index].distance;

		if (activityType != "unknown") {
			if (activityDistances.has(activityType)) {
				activityDistances.set(activityType, activityDistances.get(activityType) + distance);
			} else {
				activityDistances.set(activityType, distance);
			}
		}
	}

	// Assign the average distance to each activity
	for ( var [activity, distance] of activityDistances) {
		let count = activityCount.get(activity)
		activityDistances.set(activity, distance / count)
	}

	// Sorting activity's distances based on longest distance
	const distances = Array.from(activityDistances.entries());
	distances.sort((a, b) => b[1] - a[1]);
	

	// List longest and shortest activiity by avg distance
	document.getElementById("longestActivityType").innerText = distances[0][0];
	document.getElementById("shortestActivityType").innerText = distances[distances.length - 1][0];


	// Find whether longest activities were on weekends or weekdays

	// avg distances into weekend vs weekdays
	var activitiesOnWeekdays = [];
	var activitiesOnWeekends = [];
	var weekdayDistanceAvg = 0;
	var weekendDistanceAvg = 0;

	// sort tweets based on distance and day
	for (let index = 0; index < tweet_array.length; index++) {
		const tweet = tweet_array[index];
		const day = tweet.time.getDay();
		
		// day is weekend
		if (day == 0 || day == 6) {
			activitiesOnWeekends.push(tweet_array[index]);
			weekendDistanceAvg += tweet.distance
		} else {
			activitiesOnWeekdays.push(tweet_array[index])
			weekdayDistanceAvg += tweet.distance
		}
	}

	// calc avg between weekday/weekend
	weekdayDistanceAvg /= activitiesOnWeekdays.length;
	weekendDistanceAvg /= activitiesOnWeekends.length;

	if (weekdayDistanceAvg >= weekendDistanceAvg) {
		document.getElementById('weekdayOrWeekendLonger').innerText = 'weekdays';
	} else {
		document.getElementById('weekdayOrWeekendLonger').innerText = 'weekends';
	}

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.

	// Convert data to be vegalite-compatible
	const activityData = entries.map(([activity, count]) => ({
		Activity: activity,
		Count: count
	}));

	var activity_vis_spec = {
	"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": activityData
	  },
	  "mark": {
		"type": "point"
	  },
	  "encoding": {
		"x": {
			"field": "Activity",
			"type": "nominal"
		},
		"y": {
			"field": "Count",
			"type": "quantitative",
			"title": "# of Tweets"
		},
	  }
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});