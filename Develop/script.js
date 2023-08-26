// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

function currentDay() {
  var day = new Date();
  var weekday = day.getDay();
  var dayOfTheWeek = { 0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday", 5: "Friday", 6: "Saturday" };
  $("#currentDay").text(dayOfTheWeek[weekday]);
}

function timeBlockColors() {
  var currentHour = new Date();
  currentHour = currentHour.getHours();
  console.log(currentHour);
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
  if (currentHour < 9) {
    console.log("all green");
  }
  if (currentHour > 17) {
    console.log("all grey");
  } else {
    for (i = 9; i < currentHour; i++) {
      // blockList[i].setAttribute("class", "past");
      blockList[i].addClass("past");
    }
    for (i = 17; i > currentHour; i--) {
      // console.log(blockList[i].classList.contains());
      // blockList[i].classList.add("future");
      // $("#hour-4").setAttribute("class", "future");
      blockList[i].addClass("future");
    }
    // blockList[currentHour].classList.add("present");
    // console.log(blockList[currentHour].classList.contains());
    // blockList[currentHour].setAttribute("class", "present");
    blockList[currentHour].addClass("present");
  }
}

currentDay();
timeBlockColors();
