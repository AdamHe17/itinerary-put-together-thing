(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

var $input = $('.datepicker').pickadate();
var picker = $input.pickadate('picker');

var traveller = {
	budget : 0,
	start_time : '2015-11-22',
	end_time : '2015-11-24',
	where: 'paris'
}