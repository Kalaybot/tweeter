/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

// Function to render an array of tweets
const renderTweets = function(tweets) {
  // Empty the container before adding new tweets
  $('#tweets-container').empty();

  // Loops through the tweets
  for (const tweet of tweets) {
    // Calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);

    // Appends the tweet to the tweets container
    $('#tweets-container').prepend($tweet);
  }
};

const createTweetElement = (tweet) => {
  const $tweet = $(`
    <article class="tweet">
      <header class="user-header">
        <div class="avatar">
          <img src="${tweet.user.avatars}" alt="${tweet.user.name}'s avatar">
        </div>
        <span class="name">${tweet.user.name}</span>
        <h3 class="username">${tweet.user.handle}</h3>
      </header>
      <section class="tweet-content">
        <p class="tweet-text">${tweet.content.text}</p>
      </section>
      <footer class="tweet-footer">
        <time class="timestamp">${timeSince(tweet.created_at)} ago</time>
        <span class="interactive-icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
      </footer>
    </article>
  `);
  return $tweet;
};

// Helper function to calculate time since the tweet was created
function timeSince(timestamp) {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""}`;
    }
  }
  return `${seconds} second${seconds !== 1 ? "s" : ""}`;
}

// Test / driver code
$(document).ready(function() {
  renderTweets(data);
});

$('form').on('submit', function(event) {
  event.preventDefault(); // Prevents form submission

  const formData = $(this).serialize(); // Standardized form data (key=value&key2=value2)

  $.ajax({
    url: '/tweets', // API documentation (server endpoint)
    method: 'POST', // HTTP method
    data: formData, // Standardized form data
    success: function(response) {
      console.log("Tweet submitted successfully:", response);
      // Prepend new tweets in the container
      const newTweet = createTweetElement(response); // Create the new tweet DOM element
      $('#tweets-container').prepend(newTweet); // Add the new tweet to the DOM
    },
    error: function(error) {
      console.error("Error submitting tweet:", error); // Error handling
    }
  });
});