// Wrapped all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Listener for click events on the save button. Uses the id in the containing 
  // time-block as a key to save the user input in local storage.
  $(".saveBtn").on("click", function(event){
    key = $(event.target).parent().attr('id')

    if ($(event.target).parent().attr('id') === undefined){
      key = $(event.target).parent().parent().attr("id")
    }

    value = $(`#${key}`).children("textarea").val()

    localStorage.setItem(`${key}`, `${value}`)
  })


  // Code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour.
  setInterval(function() {
    // Get current hour
  var currenthour = dayjs().format("hA")
  var currenthournumber = dayjs().format("h")

  // Check AM/PM of current hour
  if (currenthour.substr(-2) == "AM"){
    var currentAM = true
  }
  else{
    var currentAM = false
  }
  
  // Check hour of each div against current hour (every second?)
  // hrs 9-12am
  for (var i=9 ; i < 13; i++){   
    var divAM = true
  
    // If both are AM/PM, compare numbers
    if (currentAM === divAM){
      if(Number($(`#hour-${i}`).attr('id').substr(5)) < Number(currenthournumber)){
        (`#hour-${i}`).addClass("past")
      }
      else if (Number($(`#hour-${i}`).attr('id').substr(5)) == Number(currenthournumber)){
        $(`#hour-${i}`).addClass("present")
      }
      else if (Number($(`#hour-${i}`).attr('id').substr(5)) > Number(currenthournumber)){
        $(`#hour-${i}`).addClass("future")
      }
    }
     //If current time is PM but divtime is AM
    else if (currentAM == false && divAM == true){
      $(`#hour-${i}`).addClass("past")
    }
    else{
      console.log("something wrong!")
    }
  }

  //hours 1-5pm
  for (var i=1 ; i < 6; i++){
    var divAM = false

    // If both are AM/PM, compare numbers
    if (currentAM === divAM){
      if(Number($(`#hour-${i}`).attr('id').substr(5)) < Number(currenthournumber)){
        $(`#hour-${i}`).addClass("past")
      }
      else if (Number($(`#hour-${i}`).attr('id').substr(5)) == Number(currenthournumber)){
        $(`#hour-${i}`).addClass("present")
      }
      else if (Number($(`#hour-${i}`).attr('id').substr(5)) > Number(currenthournumber)){
        $(`#hour-${i}`).addClass("future")
      }
    }
    //If current time is AM but divtime is PM
    else if (currentAM == true && divAM == false){
      $(`#hour-${i}`).addClass("future")
    }
    else{
      console.log("something wrong here!")
    }
  }
  }, 1000)

  // Code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  for (var i=0 ; i < localStorage.length ; i++){
    var key = localStorage.key(i)

    if (key.substring(0,4) === "hour"){
      var localvalue = localStorage.getItem(`${key}`)
      $(`#${key}`).children(".description").text(localvalue)
    }
  }


  // Code to display the current date in the header of the page.
  var currentdate = dayjs().format("dddd, MMMM D")
  var daynum = dayjs().date()
  var suffix = ""
  if (daynum == 1 || daynum == 21 || daynum == 31){
    suffix = "st"
  }
  else if (daynum == 2 || daynum == 22){
    suffix = "nd"
  }
  else if (daynum == 3 || daynum == 23){
    suffix = "rd"
  }
  else{
    suffix = "th"
  }

  $(currentDay).text(`${currentdate}${suffix}`)
});
