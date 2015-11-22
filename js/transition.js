$("#calculate-button").click(function() {
  $('#index-banner').slideUp(1000);
  $('[id=block-title]').slideUp(1000);
  $('[id=block-icon]').slideUp(1000);
  $('[id=block-description]').slideUp(1000);
  $('#calculate-button').fadeOut(1000);

  setTimeout(function() {
    $('.transition').css('background', 'block');
    loadAttractions();
    loadHotels();
  }, 1000);

  setTimeout(function() {
    $('.results').css('display', 'block');
    loadAttractions();
    loadHotels();
  }, 6000);
})
