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
	
	for (let index = 0; index < tweet_array.length; index++) {
		var activityType = tweet_array[index].activityType;
		if (activityType != "unknown") {
			if (activityCount.has(activityType)) {
				// console.log("incrementing " + activityType + " to " + activityCount.get(activityType));
				activityCount.set(activityType, activityCount.get(activityType) + 1);
			} else {
				activityCount.set(activityType, 1);
			}
		}
	}
	
	document.getElementById('numberActivities').innerText = activityCount.size;


	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.

	var activity_vis_spec = {
	"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": tweet_array
	  }
	  //TODO: Add mark and encoding
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});