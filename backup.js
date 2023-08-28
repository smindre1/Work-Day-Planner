// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {});

function currentDay() {
  var day = new Date();
  var weekday = day.getDay();
  var dayOfTheWeek = { 0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday" };
  $("#currentDay").text(dayOfTheWeek[weekday]);
}

function timeBlockColors() {
  var currentHour = new Date();
  currentHour = currentHour.getHours();
  // console.log(currentHour);
  blockList = {
    9: $("#hour-9"),
    10: $("#hour-10"),
    11: $("#hour-11"),
    12: $("#hour-12"),
    13: $("#hour-1"),
    14: $("#hour-2"),
    15: $("#hour-3"),
    16: $("#hour-4"),
    17: $("#hour-5"),
  };
  // currentHour = 8;
  // currentHour = 9;
  if (currentHour < 9) {
    for (i = 9; i < 18; i++) {
      blockList[i].addClass("future");
    }
  }
  if (currentHour > 17) {
    for (i = 9; i < 18; i++) {
      blockList[i].addClass("past");
    }
  }
  if (9 <= currentHour <= 17) {
    for (i = 9; i < currentHour; i++) {
      blockList[i].addClass("past");
    }
    for (i = 17; i > currentHour; i--) {
      blockList[i].addClass("future");
    }
    blockList[currentHour].addClass("present");
  }
}

$("button").click(function () {
  var plans = { 9: "", 10: "", 11: "", 12: "", 13: "", 14: "", 15: "", 16: "", 17: "" };
  if (localStorage.getItem("workDayPlans") === null) {
    localStorage.setItem("workDayPlans", JSON.stringify(plans));
  }
  for (i = 9; i < 18; i++) {
    console.log(plans, "plans");
    plans = JSON.parse(localStorage.getItem("workDayPlans"));
    plans[i] = blockList[i].children("textarea").val();
    console.log(plans, "plans");
    localStorage.setItem("workDayPlans", JSON.stringify(plans));
  }
});

function loadWorkDayPlans() {
  if (localStorage.getItem("workDayPlans") === null) {
    return;
  }
  workDayPlans = JSON.parse(localStorage.getItem("workDayPlans"));
  key = { 9: "9", 10: "10", 11: "11", 12: "12", 13: "13", 14: "14", 15: "15", 16: "16", 17: "17" };
  for (i = 9; i < 18; i++) {
    blockList[i].find("textarea").append(workDayPlans[key[i]]);
  }
}

currentDay();
timeBlockColors();
loadWorkDayPlans();

//Where should blockList be? global? does it need var before it's creation?
//I hardset the current Hour because 8 does not work for hour.
