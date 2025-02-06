// making writtenTweets global to be accessed across functions
var writtenTweets = [];

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	var tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	// Array only of tweets with user messages
	writtenTweets = tweet_array.filter(tweet => tweet.written === true);
}

function addEventHandlerForSearch() {
	const searchBar = document.getElementById('textFilter');
	const tweetTableBody = document.getElementById('tweetTable');

	searchBar.addEventListener('keyup', function () {
		// Get the current search text
		const searchText = searchBar.value.toLowerCase();
		document.getElementById('searchText').innerText = searchText;

		// If the search box is empty, clear the table and reset the count
		if (searchText.trim() === '') {
			tweetTableBody.innerHTML = ''; // Clear the table
			document.getElementById('searchCount').innerText = '0'; // Reset count
			return;
		}

		// Filter tweets based on the search text
		const relevantTweets = writtenTweets.filter(tweet =>
			tweet.text.toLowerCase().includes(searchText)
		);

		// Update the count of relevant tweets
		document.getElementById('searchCount').innerText = relevantTweets.length;

		// Clear the table
		tweetTableBody.innerHTML = '';

		// Populate the table with relevant tweets
		relevantTweets.forEach((tweet, index) => {
			const row = document.createElement('tr');

			// Add row number
			const numberCell = document.createElement('td');
			numberCell.innerText = index + 1;
			row.appendChild(numberCell);

			// Add activity type
			const activityCell = document.createElement('td');
			activityCell.innerText = tweet.activityType;
			row.appendChild(activityCell);

			// Add tweet text with clickable links
			const tweetCell = document.createElement('td');
			tweetCell.innerHTML = tweet.text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
			row.appendChild(tweetCell);

			// Append the row to the table body
			tweetTableBody.appendChild(row);
		});
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
	
});