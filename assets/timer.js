// What to do when the timer runs out
function gameOver() {
  // This cancels the setInterval, so the updateTimer stops getting called
  clearInterval(secondsPassed);
  gameState = 0;
  // re-show the button, so they can start it again
  //document.getElementById('playButton').style.visibility = "visible";
  document.getElementById('resetButton').style.visibility = "visible";
  document.getElementById('showInstructions').style.visibility = "hidden";
  let update  = document.getElementById('timer')
  update.style.fontSize="4rem"
  update.innerText = "You Lose!";
  GameLevel = 1;
  gamesPlayed += 1;
}

//Fucntion to execute game timer
function updateTimer() {
  oldTimeStamp = oldTimeStamp - 1;
  if(oldTimeStamp > 0){
    if (checkWinStatus() == true){
      checkGameStatus();
    }else {
      for (let i = 0; i < allGameObjects.length; i++){
        if (allGameObjects[i].name=="NPC"){
          
          allGameObjects[i].moveNPC();
        }
      }
      let update  = document.getElementById('timer')
      update.style.fontSize="6rem"
      update.innerText = oldTimeStamp;
    }
  } else if (oldTimeStamp == 0){
    if (checkWinStatus() == true){
      checkGameStatus();
    }
  } else {
    gameOver();
  }
}

// The button has an on-click event handler that calls this
function startGame() {
  gameState = 1;
  if (GameLevel == 1){
    oldTimeStamp = 90; // 90 seconds initial setting
  } else if (GameLevel == 2){
    oldTimeStamp = 60; // 60 seconds lvl 2 setting
  } else if (GameLevel == 3){
    oldTimeStamp = 45; // 45 seconds lvl 3 setting
  } else if (GameLevel == 4){
    oldTimeStamp = 30; // 30 seconds lvl 4 setting
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

