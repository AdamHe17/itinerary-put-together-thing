var sleeptime = {
  cost: 0,
  opening: 0,
  closing: 23,
  duration: 1,
  rating: 5,
  name: "sleep",
  lat: null,
  lng: null,
  icon: null
}

var mealtime = {
  cost: 0,
  opening: 0,
  closing: 23,
  duration: 1,
  rating: 5,
  name: "eat",
  lat: null,
  lng: null,
  icon: null
}

function SortAttractions(attractions) {
  attractions.sort(function(a, b) {
    return (b.rating) - (a.rating);
  });
}

function SortEvents(events) {
  events.sort(function(a, b) {
    return (b.rating) - (a.rating);
  });
}

function ChooseHotel(budget, hotels, num_days) {
  var hotel_rating = 0;
  var hotel_budget = .7 * budget;
  var ii = 0;
  var jj = 0;
  while (hotels[ii] != null) {
    if ((hotels[ii].cost * num_days < hotel_budget) && (hotels[ii].rating > hotel_rating)) {
      hotel_rating = hotels[ii].rating;
      jj = ii;
      ii++;
    } else {
      ii++;
    }
  }
  return hotels[jj];
}

function CreateBlankSchedule(num_days) {
  var MySchedule = new Array(num_days);
  var ii = 0;
  while (ii < num_days) {
    MySchedule[ii] = new Array(24);
    ii++;
  }
  return MySchedule;
}

function IsTimeOpen(attraction, schedule_for_day, start_time) {
  var ii = start_time;
  var hours_available = 0;
  while (schedule_for_day[ii] == null && ii < 24) {
    hours_available++;
    ii++;
  }
  if (hours_available < attraction.duration) {
    return false;
  } else {
    return true;
  }
}

function SleepyTime(schedule_for_day) {
  var ii = 0;
  while (ii < 9) {
    schedule_for_day[ii] = sleeptime;
    ii++;
  }
  schedule_for_day[22] = sleeptime;
  schedule_for_day[23] = sleeptime;
}

function MealTime(schedule_for_day) {
  schedule_for_day[10] = mealtime;
  schedule_for_day[15] = mealtime;
  schedule_for_day[20] = mealtime;
}

function AllotTime(attraction, schedule_for_day, start_time) {
  var ii = start_time;
  var jj = 0;
  var arriving_time;
  var leaving_time;
  var index;
  while (IsTimeOpen(attraction, schedule_for_day, ii) == false && ii < 24) {
    ii++;
  }
  if (ii > (24 - attraction.duration)) {
    return false;
  } else {
    while (jj < attraction.duration) {
      schedule_for_day[ii + jj] = attraction;
      jj++;
    }
    return true;
  }
}

function number_days(start_string, end_string){
    var trip_start_time = new Date(start_string);
    var trip_end_time = new Date(end_string);
    if (trip_start_time.getMonth() == trip_end_time.getMonth()) {
        num_days = Math.abs(trip_start_time.getDate() - trip_end_time.getDate());
    }
    else {
        num_days = Math.abs((30 * (trip_start_time.getMonth() - 1) + trip_start_time.getDate()) - (30 * (trip_end_time.getMonth() - 1) + trip_end_time.getDate()));
    }
    return num_days;
}

function planTrip(attractions, schedule) {
  var plan = schedule;
  var attraction_index = 0;
  var j = 0;

  SortAttractions(attractions);

  for (var i = 0; i < plan.length; i++) {
    SleepyTime(plan[i]);
    MealTime(plan[i]);

    if (attraction_index >= attractions.length) {
      continue;
    } else {
      while (j < 24) {
        while ((plan[i])[j] != null) {
          j++;
        }
        if (attraction_index >= attractions.length) {
          continue;
        } else if (AllotTime(attractions[attraction_index], plan[i], j)) {
          j += attractions[attraction_index].duration;
          attraction_index++;
        } else {
          j = 0;
          break;
        }
      }

    }

  }
  return plan;
}

function makeItinerary() {
  var schedule = [];
  loadAttractions(schedule);
  loadHotels();
}
