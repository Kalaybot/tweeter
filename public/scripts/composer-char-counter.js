$(document).ready(function() {
  // Event listener for input event on textarea
  $('.text-area').on('keyup', function() {
    // Get the length of the text inside the textarea
    var textLength = $(this).val().length;
    
    // Calculate remaining characters (140 - current length)
    var remainingChars = 140 - textLength;
    
    // Traverse DOM: get the .counter element within the same form
    var counter = $(this).closest('form').find('.counter');
    
    // Update the .counter element with the remaining characters
    counter.text(remainingChars);
    
   // If remaining characters are less than 0, add 'counter-red' class
   if (remainingChars < 0) {
      counter.addClass('counter-red'); // Adds red color to counter
    } else {
      counter.removeClass('counter-red'); // Removes red color when back under limit
    }
  });
});

