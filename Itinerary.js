var TravellerBudget = traveller.budget;
var Traveller_Trip_Start_Time = traveller.start_time;
var Traveller_Trip_End_Time = traveller.end_time;
var Traveller_Destination = traveller.where;

function SortAttractions(attractions) {
    attractions.sort(function(a, b) {
    return (b.rating) - (a.rating);
});

function SortEvents(events) {
    events.sort(function(a, b) {
    return (b.rating) - (a.rating);
});

function ChooseHotel(budget, hotels) {
    var hotel_rating = 0;
    var hotel_budget = .7 * budget;
    var ii = 0;
    var jj = 0;
    while (hotels[ii] != null) {
        if ((hotels[ii].cost < hotel_budget) && (hotels[ii].rating > hotel_rating)) {
            hotel_rating = hotel[ii].rating;
            jj = ii;
            ii++;
        }
        else {
            ii++;
        }
    }
    return hotels[jj];
}

function CreateBlankSchedule(trip_start_time, trip_end_time) {
    var MySchedule = [];
    var ii = 0;
    var num_days;
    if (trip_start_time.getMonth() == trip_end_time.getMonth) {
        num_days = abs(trip_start_time.getDate - trip_end_time.getDate);
    }
    else {
        num_days = abs((30 * (trip_start_time.getMonth() - 1) + trip_start_time.getDate()) - (30 * (trip_end_time.getMonth() - 1) + trip_end_time.getDate()));
    }
    while (ii < num_days) {
        MySchedule[ii] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
        ii++;
    }
    return MySchedule;
    return num_days;
}

function IsTimeOpen(duration_at_place, schedule_for_day) {
    var ii = 0;
    var hours_available = 0;
    while (schedule_for_day[ii] == null) {
        ii++;
    }
    while (schedule_for_day[ii] != null) {
        hours_available++;
        ii++;
    }
    if (hours_available < duration_at_place) {
        return false;
    }
    else {
        return true;
    }
}

function SleepyTime(schedule_for_day) {
    var ii = 0;
    while (ii < 9) {
        schedule_for_day[ii] == null;
        ii++;
    }
    schedule_for_day[22] == null;
    schedule_for_day[23] == null;
}

function MealTime(schedule_for_day) {
    schedule_for_day[10] == null;
    schedule_for_day[15] == null;
    schedule_for_day[20] == null;
}

function AllotTime(duration_at_place, schedule_for_day) {
    var ii = 0;
    var jj = 0;
    var arriving_time;
    var leaving_time;
    var index;
    while (schedule_for_day[ii] == null) {
        ii++;
    }
    arriving_time = schedule_for_day[ii];
    if (IsTimeOpen(duration_at_place, schedule_for_day) == true) {
        while (jj < duration_at_place) {
            schedule_for_day[ii] == null;
            jj++;
        }
        leaving_time = schedule_for_day[ii];
    }
}



var WorkingSchedule = CreateBlankSchedule(Traveller_Trip_Start_Time, Traveller_Trip_End_Time);
var ii = 0;

while(ii < num_days) {
    SleepyTime(WorkingSchedule[ii]);
    MealTime(WorkingSchedule[ii]);
}