$(function () {
  currentDay();
  timeBlockColors();
  loadWorkDayPlans();
});

//Obtains the day of the week and date to display on the top of the webpage.
function currentDay() {
  var day = new Date();
  dayOfMonth = day.getDate();
  var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  monthOfYear = day.getMonth();
  var weekday = day.getDay();
  var dayOfTheWeek = { 0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday" };
  $("#currentDay").text(dayOfTheWeek[weekday] + ", " + month[monthOfYear] + " " + dayOfMonth);
}

//Checks the user's time when page loads and adjusts the timeblock's colors to coordinate with it.
function timeBlockColors() {
  var currentHour = new Date();
  currentHour = currentHour.getHours();
  blockList = [
    $("#hour-9").find("textarea"),
    $("#hour-10").find("textarea"),
    $("#hour-11").find("textarea"),
    $("#hour-12").find("textarea"),
    $("#hour-1").find("textarea"),
    $("#hour-2").find("textarea"),
    $("#hour-3").find("textarea"),
    $("#hour-4").find("textarea"),
    $("#hour-5").find("textarea"),
  ];

  for (i = 9; i <= 17; i++) {
    if (i < currentHour) {
      blockList[i - 9].addClass("past");
    } else if (currentHour == i) {
      blockList[currentHour - 9].addClass("present");
    } else if (currentHour < i) {
      blockList[i - 9].addClass("future");
    }
  }
}

//Upon the page loading or refreshing this function checks the local storage for user's prior plan
//edits and if they exist it fills them out into the coorisponding textareas.
function loadWorkDayPlans() {
  if (localStorage.getItem("workDayPlans") === null) {
    return;
  }
  workDayPlans = JSON.parse(localStorage.getItem("workDayPlans"));
  key = { 9: "9", 10: "10", 11: "11", 12: "12", 13: "13", 14: "14", 15: "15", 16: "16", 17: "17" };
  for (i = 9; i < 18; i++) {
    blockList[i - 9].append(workDayPlans[key[i]]);
  }
}

//Upon clicking any of the save buttons the user's inputed text in the textareas of the webpage get
//set into an associative array to be logged into local storage.
$("button").click(function () {
  var plans = { 9: "", 10: "", 11: "", 12: "", 13: "", 14: "", 15: "", 16: "", 17: "" };
  if (localStorage.getItem("workDayPlans") === null) {
    localStorage.setItem("workDayPlans", JSON.stringify(plans));
  }
  for (i = 9; i < 18; i++) {
    console.log(plans, "plans");
    plans = JSON.parse(localStorage.getItem("workDayPlans"));
    plans[i] = blockList[i - 9].val();
    console.log(plans, "plans");
    localStorage.setItem("workDayPlans", JSON.stringify(plans));
  }
});
