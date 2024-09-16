var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var timeout;
var interval;
var timeLimit = 5;
var timeRemaining = timeLimit;

$(document).keypress(function() {
  if (!started) {
    $("#level-title2").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    resetTimer();

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title2").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  if ($("#countdown").length === 0) {
    $("body").append('<h2 id="countdown">Time left: <span id="time-left">5</span> seconds</h2>');
  }
  startTimer();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  clearTimeout(timeout);
  clearInterval(interval);
  $("#countdown").remove();
}

function startTimer() {
  clearTimeout(timeout);
  clearInterval(interval);
  timeRemaining = timeLimit;
  updateCountdown();
  $("#countdown").show();

  interval = setInterval(function() {
    timeRemaining--;
    updateCountdown();

    if (timeRemaining <= 0) {
      gameOver();
    }
  }, 1000);

  timeout = setTimeout(function () {
    gameOver();
  }, timeLimit * 1000);
}

function resetTimer() {
  clearTimeout(timeout);
  clearInterval(interval);
  startTimer();
}

function updateCountdown() {
  $("#time-left").text(timeRemaining);
}

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title2").text("Game Over, Press Any Keyboard Key to Restart");
  clearInterval(interval);
  startOver();
}
