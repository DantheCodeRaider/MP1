// What to do when the timer runs out
function gameOver() {
  // This cancels the setInterval, so the updateTimer stops getting called
  clearInterval(secondsPassed);
  // re-show the button, so they can start it again
  //document.getElementById('playButton').style.visibility = "visible";
  document.getElementById('resetButton').style.visibility = "visible";
  document.getElementById('showInstructions').style.visibility = "hidden";
  let update  = document.getElementById('timer')
  update.style.fontSize="3rem"
  update.textContent = "You Lose!";
  document.body.append(update.textContent)
  /*   theTimerWindow.style.font="bold 3em"
  theTimerWindow.style.style,zIndex
  theTimerWindow.append(); */
}

function updateTimer() {
  oldTimeStamp = oldTimeStamp - 1;
  if(oldTimeStamp > 0){
    if (checkWinStatus() == true){
      let update  = document.getElementById('timer')
      update.style.fontSize="3rem"
      update.textContent = "You Win!";
      document.body.append(update.textContent)
    }else {
      let update  = document.getElementById('timer')
      update.textContent = oldTimeStamp;
      document.body.append(update.textContent)
    }
  } else if (oldTimeStamp == 0){
    if (checkWinStatus() == true){
      let update  = document.getElementById('timer')
      update.style.fontSize="3rem"
      update.textContent = "You Win!";
      document.body.append(update.textContent)
    }else {
      let update  = document.getElementById('timer')
      update.style.fontSize="3rem"
      update.textContent = "You Lose!";
      document.body.append(update.textContent)
    }
  } else {
    gameOver();
  }
}

// The button has an on-click event handler that calls this
function startGame() {
  if (currentLevel == 1){
    oldTimeStamp = 120; // 120 seconds initial setting
  } else if (currentLevel == 2){
    oldTimeStamp = 90; // 120 seconds initial setting
  } else if (currentLevel == 3){
    oldTimeStamp = 60; // 120 seconds initial setting
  } else if (currentLevel == 4){
    oldTimeStamp = 45; // 120 seconds initial setting
  } else {
    oldTimeStamp = 120; // 120 seconds initial setting
  }
  // setInterval is a built-in function that will call the given function every N milliseconds (1 second = 1000 ms)
  secondsPassed = setInterval(updateTimer, 1000);
  
  // It will be a whole second before the time changes, so we'll call the update once
  updateTimer();
  
  // We don't want the to be able to restart the timer while it is running, so hide the buttons.
   document.getElementById('playButton').style.visibility = "hidden";
   document.getElementById('resetButton').style.visibility = "hidden";
   document.getElementById('showInstructions').style.visibility = "hidden";
}

