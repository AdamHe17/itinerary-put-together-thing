function getItin(){
    window.location = "~/itinerary.asp?destination=" + document.getElementById("destination").value + "&budget=" + document.getElementById("budget").value + "&beginDate=" + document.getElementById("begin-date").value + "&endDate=" + document.getElementById("end-date").value;
}