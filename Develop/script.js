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
  // hrs 9-11am, 12pm
  for (var i=9 ; i < 13; i++){   
    var divAM = true

    if (i == 12){
      divAM = false
    }

    // FOR i == 12 when the current time is 1-5pm
    // If both are PM, compare numbers
    if (currenthournumber==1 || currenthournumber==2 || currenthournumber==3 || currenthournumber==4 || currenthournumber==5){
      $(`#hour-${i}`).addClass("past")
    }

    // FOR i == 9, 10, 11, 12 when the current time is 9-11am or 12pm
    // If both are AM/PM, compare numbers
    else if(currenthournumber==9 || currenthournumber==10 || currenthournumber==11 || currenthournumber==12){
      if (currentAM == divAM){
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

      //If current time is PM but divtime is AM
      else if (currentAM == false && divAM == true){
        $(`#hour-${i}`).addClass("past")
      }
      
      //If current time is AM but divtime is PM
      else if (currentAM == true && divAM == false){
        $(`#hour-${i}`).addClass("future")
      }

      else{
        console.log("something wrong!")
      }
    }
  }

  //hours 1-5pm
  for (var i=1 ; i < 6; i++){
    var divAM = false
    // FOR CURRENT-TIME 12PM: set 1-5PM as 'future'
    if(currenthournumber==9 || currenthournumber==10 || currenthournumber==11 || currenthournumber==12){
      $(`#hour-${i}`).addClass("future")
    }
    // FOR CURRENT-TIMES 1-5PM: compare numbers
    else if(currenthournumber==1 || currenthournumber==2 || currenthournumber==3 || currenthournumber==4 || currenthournumber==5){
      if (currentAM == divAM){
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
        console.log("something wrong")
      }
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
