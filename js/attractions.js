var map;
var destination_latlng;
var service;
var infowindow;
var attractions = [];

var destination_latlng = new google.maps.LatLng(48.8567, 2.3508);

map = new google.maps.Map(document.getElementById('map'), {});

var request = {
  location: destination_latlng,
  radius: '500',
  query: 'attractions'
};

service = new google.maps.places.PlacesService(map);
service.textSearch(request, callback);

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var attraction = {
        cost: 0,
        opening: 0,
        closing: 23,
        duration: 4,
        rating: results[i].rating,
        name: results[i].name,
        lat: results[i].geometry.location.lat(),
        lng: results[i].geometry.location.lng()
      }
      attractions.push(attraction);
    }
  }
}