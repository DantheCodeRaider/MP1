// What to do when the timer runs out
function gameOver() {
  // This cancels the setInterval, so the updateTimer stops getting called
  clearInterval(secondsPassed);
  
  // re-show the button, so they can start it again
  document.getElementById('playAgainButton').style.visibility = "visible";
  document.getElementById('showInstructions').style.visibility = "visible";
/*   theTimerWindow.style.font="bold 3em"
  theTimerWindow.style.style,zIndex
  theTimerWindow.append(); */
}

function updateTimer() {
  oldTimeStamp = oldTimeStamp - 1;
  if(oldTimeStamp > 0){
    let update  = document.getElementById('timer')
    //console.log(oldTimeStamp)
    update.textContent = oldTimeStamp;
    document.body.append(update.textContent)
  } else if (oldTimeStamp == 0){
    let update  = document.getElementById('timer')
    //console.log(oldTimeStamp)
    update.textContent = "";
    document.body.append(update.textContent)
  } else {
    gameOver();
  }
}

// The button has an on-click event handler that calls this
function start() {
  // setInterval is a built-in function that will call the given function every N milliseconds (1 second = 1000 ms)
  secondsPassed = setInterval(updateTimer, 1000);
  
  // It will be a whole second before the time changes, so we'll call the update once
  updateTimer();
  
  // We don't want the to be able to restart the timer while it is running, so hide the button.
   document.getElementById('playAgainButton').style.visibility = "hidden";
   document.getElementById('showInstructions').style.visibility = "hidden";
}

