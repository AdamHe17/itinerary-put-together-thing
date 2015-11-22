var key = 'AIzaSyAcUh_F-l4UP33WTaV4AUplb7Rson26hXg';
var city = 'paris';
var url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=attractions+in'+city+'&key='+key;
var results = $.getJSON(url, function(data) {
});
console.log(results);