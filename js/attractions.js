function loadAttractions(out_sched) {
  extract();
  var map;

  var service;
  var infowindow;
  var attractions = [];
  map = new google.maps.Map(document.getElementById('map'), {});
  var destination = traveller.where;
  var destination_latlng = new google.maps.LatLng();
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    'address': destination
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      destination_latlng = results[0].geometry.location;
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
              lng: results[i].geometry.location.lng(),
              icon: results[i].photos[0].getURL({'maxWidth': 35, 'maxHeight': 35})
            }
            attractions.push(attraction);
          }
          var numdays = number_days(traveller.start_date,traveller.end_date);
          var schedule = CreateBlankSchedule(numdays);
          schedule = planTrip(attractions, schedule);
          var itinerary = $('.attractions');
          var current_attraction = '';
          for (i = 0; i < numdays; i++) {
            itinerary.append('<div class="day">Day ' + (i + 1).toString());
            for (j = 0; j < 23; j++) {
              if (schedule[i][j] != null) {
                if (schedule[i][j].name != 'sleep' && schedule[i][j].name != 'eat' && schedule[i][j].name != current_attraction) {
                  itinerary.append('<div class="attraction">' + '<div class="time">' + j.toString() + '</div><div class="attraction_name">' + schedule[i][j].name + '</div></div>');
                  current_attraction = schedule[i][j].name;
                }
              }
            }
          }
        }
      }
    } else {
      console.log("Something fucked up guys " + status);
    }

  });


}

function loadHotels() {
  var hotels = [];
  map = new google.maps.Map(document.getElementById('map'), {});
  var destination = traveller.where;
  var destination_latlng = new google.maps.LatLng();
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    'address': destination
  }, function(results, status) {
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
              name: results[i].name,
                        icon: results[i].photos[0].getURL({'maxWidth': 35, 'maxHeight': 35})
            };
            hotels.push(hotel);
          }
          var numdays = number_days(traveller.start_date,traveller.end_date);
          var h = ChooseHotel(traveller.budget, hotels, numdays);
          var itinerary = $('.hotel');
          itinerary.append('U B stayin at ' + h.name);
        }
      }
    } else {
      console.log("Something fucked up guys " + status);
    }
  });
}
