$(document).ready(function() {
  // Event listener for input event on textarea
  $('.text-area').on('input', function() {
    // Get the length of the text inside the textarea
    var textLength = $(this).val().length;
    
    // Calculate remaining characters (140 - current length)
    var remainingChars = 140 - textLength;
    
    // Traverse DOM: get the .counter element within the same form
    var counter = $(this).closest('form').find('.counter');
    
    // Update the .counter element with the remaining characters
    counter.text(remainingChars);
    
    // Optional: Change the counter color if the limit is exceeded
    if (remainingChars < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', 'black');
    }
  });
});

