var buttonColors = ["red", "blue", "green", "yellow"]; //array of button colors
var userClickedPattern = []; //array to store the color chosen by the user
var gamePattern = []; //array to store the color grnrated randomly by the game
var started = false; // variable for the countown of the game
var level = 0;

//getting the any keyboard input to start the game
$(document).keydown(function () {
  if (!started) {
    $("#level-title").html("Level " + level);
    nextSequence();
    started = true;
  }
});

/* getting the click input to get the input color by the player and to add it in the userClickedPattern with animation and play sound
then to check it with the gamePattern array*/
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  //animation and play sound
  playSound(userChosenColor);
  animatePress(userChosenColor);

  /* Checking the every  input with the gamePattern array which takes the last index of the userClickedPattern array as parameter */
  checkAnswer(userClickedPattern.length - 1);
});

//checkAnswer function to check the input of user every time it invoke the click event by entering the pattern he/she remembers
function checkAnswer(currentLevel) {
  /*it checks for the latest input with the game patter lets say if it was first input the it will compare 
  gamePattern[0] === userClickedPattern[0] and it will let user to invoke the click event one by one and
   simultaneously it compares with the gamePattern array.When the length of the userClickedPattern is equal
    to the game pattern ,it means user has entered all the values correctly now is the time
     to move to the next level by calling the next sequence function.*/
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

// next sequence function which will be called when user enters the next level or the start of the game
function nextSequence() {
  userClickedPattern = [];
  level++;
  //genration of a random number so that its colour can be pushed in to the the gamePattern array
  $("#level-title").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //button which is sequenced by game should have some animation and sound so that user can see it
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

//Function to start the game again when player press wrong button
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}

//function to play the sound
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

//function to animate the button when user press it
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
