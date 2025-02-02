function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}


	var tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	
	// num of total tweets
	var numTweets = tweet_array.length;
	document.getElementById('numberTweets').innerText = numTweets;

	// range of dates of tweets
	document.getElementById('firstDate').innerText = tweet_array[tweet_array.length-1].time.toLocaleDateString("en-US", 
		{weekday: "long", year: "numeric", month: "long", day: "numeric"});

	document.getElementById('lastDate').innerText = tweet_array[0].time.toLocaleDateString("en-US", 
		{weekday: "long", year: "numeric", month: "long", day: "numeric"});

	// COMPLETED EVENTS
	var completedEventCount = 0;
	
	for (let i = 0; i < tweet_array.length; i++) {
		if (tweet_array[i].source == "completed_event") {
			completedEventCount++;
		}
	}

	// # of completed events in completed events section
	document.getElementsByClassName('completedEvents')[0].textContent = String(completedEventCount);
	
	
	// calculate percentage
	document.getElementsByClassName('completedEventsPct')[0].textContent = (String(((completedEventCount / numTweets) * 100).toFixed(2)) + "%");
	
	
	// LIVE EVENTS
	var liveEventsCount = 0;
	
	for (let i = 0; i < tweet_array.length; i++) {
		if (tweet_array[i].source == "live_event") {
			liveEventsCount++;
		}
	}
	
	document.getElementsByClassName('liveEvents')[0].textContent = String(liveEventsCount);
	
	// calculate percentage
	document.getElementsByClassName('liveEventsPct')[0].textContent = (String(((liveEventsCount / numTweets) * 100).toFixed(2)) + "%");
	
	// ACHIEVEMENTS
	var achievementCount = 0;
	
	for (let i = 0; i < tweet_array.length; i++) {
		if (tweet_array[i].source == "achievement") {
			achievementCount++;
		}
	}
	
	document.getElementsByClassName('achievements')[0].textContent = String(achievementCount);
	
	// calculate percentage
	document.getElementsByClassName('achievementsPct')[0].textContent = (String(((achievementCount / numTweets) * 100).toFixed(2)) + "%");
	
	// MISCELLANEOUS
	var miscCount = 0;
	
	for (let i = 0; i < tweet_array.length; i++) {
		if (tweet_array[i].source == "miscellaneous") {
			miscCount++;
		}
	}
	
	document.getElementsByClassName('miscellaneous')[0].textContent = String(miscCount);

	// calculate percentage
	document.getElementsByClassName('miscellaneousPct')[0].textContent = (String(((miscCount / numTweets) * 100).toFixed(2)) + "%");
	
	// WRITTEN

	var writtenCount = 0;
	
	for (let i = 0; i < tweet_array.length; i++) {
		if (tweet_array[i].written == true) {
			writtenCount++;
		}
	}

	// # of completed events in written section
	document.getElementsByClassName('completedEvents')[1].textContent = String(completedEventCount);

	// # of written tweets
	document.getElementsByClassName('written')[0].textContent = String(writtenCount);

	// calculate percentage
	document.getElementsByClassName('writtenPct')[0].textContent = (String(((writtenCount / numTweets) * 100).toFixed(2)) + "%");
	
}

//Wait for the DOM to load
// @ts-ignore
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});