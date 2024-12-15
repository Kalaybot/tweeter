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

// Timestamp for tweets
function timeSince(timestamp) {
  return timeago.format(new Date(timestamp)); //Using timeago library to format the timestamp
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweet) => {

  const safeHTML = `<p class="tweet-text">${escape(tweet.content.text)}</p>`;

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
      ${safeHTML}
      </section>
      <footer class="tweet-footer">
        <time class="timestamp">${timeSince(tweet.created_at)}</time>
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

// Load tweets from server
const loadTweets = function() {
  $.ajax({
    url: '/tweets', // Endpoint to get tweets
    method: 'GET', // GET method to fecth data
    success: function(tweets) {
      console.log("Tweets loaded successfully:", tweets); // Logs loaded tweets
      renderTweets(tweets); // Call renderTweets to display the tweets
    },
    error: function(error) {
      console.error("Error loading tweets:", error); // Handles error
    }
  });
};

$(document).ready(function() {
  loadTweets(); // Load tweets when page is ready

    // Handles form submission
  $('form').on('submit', function(event) {
    event.preventDefault(); // Prevents form submission

    let tweetText = $('#tweet-text').val().trim(); // Trim textarea from any whitespaces

    $("#validation-message").text("").hide();

    if (!tweetText) {
      $("#validation-message")
      .text("Error: Your tweet cannot be empty!") // Error message using .text
      .hide()
      .slideDown();
    return;
    }

    if (tweetText.length > 140) {
      // Display error for exceeding character limit
      $("#validation-message")
        .text("Too long, your tweet exceeds 140 characters.")
        .hide()
        .slideDown();
      return; // Stop execution if there's an error
    }

    const formData = $(this).serialize(); // Standardized form data (key=value&key2=value2)

    console.log("Data being sent to the server:", formData); // Log the data to console

    $.ajax({
      url: '/tweets', // API documentation (server endpoint)
      method: 'POST', // HTTP method
      data: formData, // Standardized form data
      success: function(response) {
        console.log("Tweet submitted successfully:", response);
        
        loadTweets(); // Display newly added tweets
      },
      error: function(error) {
        console.error("Error submitting tweet:", error); // Error handling
      }
    });
  });
});


