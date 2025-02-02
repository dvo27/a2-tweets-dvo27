function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}


	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	
	// num of total tweets
	document.getElementById('numberTweets').innerText = tweet_array.length;

	// range of dates of tweets
	document.getElementById('firstDate').innerText = tweet_array[tweet_array.length-1].time.toLocaleDateString("en-US", 
		{weekday: "long", year: "numeric", month: "long", day: "numeric"});

	document.getElementById('lastDate').innerText = tweet_array[0].time.toLocaleDateString("en-US", 
		{weekday: "long", year: "numeric", month: "long", day: "numeric"});

	// COMPLETED EVENTS
	let completedEventCount = 0;
	
	for (let i = 0; i < tweet_array.length; i++) {
		if (tweet_array[i].source == "completed_event") {
			completedEventCount++;
		}
	}

	document.getElementsByClassName('completedEvents')[0].textContent = String(completedEventCount);
	
}

//Wait for the DOM to load
// @ts-ignore
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});