function loadAttractions(out_sched){
    extract();
var map;

var service;
var infowindow;
var attractions = [];
map = new google.maps.Map(document.getElementById('map'), {});
var destination = traveller.where;
var destination_latlng = new google.maps.LatLng();
var geocoder = new google.maps.Geocoder();
geocoder.geocode({ 'address': destination }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        destination_latlng = results[0].geometry.location;
        console.log("City: " + destination + ", LatLng: " + destination_latlng);

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
                        duration: Math.floor(Math.random() * 4) + 1,
                        rating: results[i].rating,
                        name: results[i].name,
                        lat: results[i].geometry.location.lat(),
                        lng: results[i].geometry.location.lng()
                    }
                    attractions.push(attraction);
                    console.log(attraction.name);

                }

                    var numdays = 5;
                    var schedule = CreateBlankSchedule(numdays);
                    schedule = planTrip(attractions, schedule);

            }
        }
    }
    else {
        console.log("Something fucked up guys " + status);
    }
    
});


}

function loadHotels(){
    var hotels = [];
  map = new google.maps.Map(document.getElementById('map'), {});
  var destination = traveller.where;
  var destination_latlng = new google.maps.LatLng();
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
      'address': destination
  }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          destination_latlng = results[0].geometry.location;
          var hotels_request = {
              location: destination_latlng,
              radius: '500',
              query: 'hotels',
              type: 'lodging'
          }
          service = new google.maps.places.PlacesService(map);
          service.textSearch(hotels_request, hotels_callback);
          function hotels_callback(results, status) {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                  for (var i = 0; i < results.length; i++) {
                      var hotel = {
                          cost: Math.random() * 200 + 100,
                          rating: results[i].rating,
                          name: results[i].name
                      };
                      hotels.push(hotel);
                      console.log(hotel.name + " " + hotel.rating + " " + hotel.cost);
                  }
                  var num_days = 5;
                  var h = ChooseHotel(traveller.budget, hotels, num_days);
                  console.log("We chose the hotel " + h.name);
              }
          }
      } else {
          console.log("Something fucked up guys " + status);
      }
  });
}

