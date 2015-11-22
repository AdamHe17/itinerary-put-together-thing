(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

var $input = $('.datepicker').pickadate();
var picker = $input.pickadate('picker');

var traveller = {
	budget : 0,
	start_time : new Date(),
	end_time : new Date(),
	where: 'paris'
}