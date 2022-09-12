//Set global Variables
var GameMapSize; //Value 1 Mobile 350x650, Value 2 Tablet 700x1000, Value 3 Desktop 900x1300
var GameLevel; //Value 1-3 -  3 total levels.
var Horizon = 0; //Mobile 200px, Tablet 300px, Desktop 400px
let secondsPassed = 0; 
let oldTimeStamp = 0;
var greenCharacter = new mainCharacter('greenCharacter', 'greenCharacter', 'greenCharacter', 'Main', 'assets/img/green-character/static.gif', 0, 0, 100, 2); //Set Main Character Object
var allGameObjects; //Create Object to track all objects
var theGameWindow; //Create variable for game window tracking
var inventory; //Create variable for inventory tracking
var gemsCollected; //Create variable for tracking collected gems
var currentLevel = 0;
var gamesPlayed = 0;
let daBoulders = new Array;
let daGems = new Array;


//Variables to determine screen size for background images
let verticalOffSet = 0
let horizontalOffSet = 0
let heightOfSky = 0
let heightOfGrass = 0
let widthOfGrass = 0

//Event listener to move the Green Character
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
    switch (event.key) {
        // Code for "down arrow" key press.
        case "ArrowDown":
          greenCharacter.moveChar(0, -50, 0, "South") // Move Green Character Down (South)
        break;
          // Code for "S" key press.
        case "S":
          greenCharacter.moveChar(0, -50, 0, "South") // Move Green Character Down (South)
        break;
          // Code for "s" key press.
        case "s":
          greenCharacter.moveChar(0, -50, 0, "South") // Move Green Character Down (South)
        break;
        case "ArrowUp":
          // Code for "up arrow" key press.
          greenCharacter.moveChar(0, 50, 0, "North") // Move Green Character Up (North)
        break;
        case "W":
          // Code for "W" key press.
          greenCharacter.moveChar(0, 50, 0, "North") // Move Green Character Up (North)
        break;
        case "w":
          // Code for "w" key press.
          greenCharacter.moveChar(0, 50, 0, "North") // Move Green Character Up (North)
        break;
        case "ArrowLeft":
          // Code for "left arrow" key press.
          greenCharacter.moveChar(-50, 0, 0, "West") // Move Green Character Left (West)
        break;
        case "A":
          // Code for "A" key press.
          greenCharacter.moveChar(-50, 0, 0, "West") // Move Green Character Left (West)
        break;
        case "a":
          // Code for "a" key press.
          greenCharacter.moveChar(-50, 0, 0, "West") // Move Green Character Left (West)
        break;
        case "ArrowRight":
          // Code for "right arrow" key press.
          greenCharacter.moveChar(50, 0, 0, "East") // Move Green Character Right (East)
        break;
        case "D":
          // Code for "D" key press.
          greenCharacter.moveChar(50, 0, 0, "East") // Move Green Character Right (East)
        break;
        case "d":
          // Code for "d" key press.
          greenCharacter.moveChar(50, 0, 0, "East") // Move Green Character Right (East)
        break;
        case " ": 
          // Code for "Spacebar" key press.
          //console.log('Spacebar!')
          greenCharacter.dig(daBoulders, daGems)
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);
  // The last option dispatches the event to the listener first,
  // Then dispatches event to window
  document.addEventListener("keyup",function(event){
    //greenCharacter.moveChar(0, 0, 0, null) // Reset Character to static state when it is not moving
    //greenCharacter.context.src='assets/img/green-character/static.gif' // Reset Character to static state when it is not moving
    greenCharacter.stopChar();
  })

/* function gameLoop(timeStamp){
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    //Loop over all game objects
    for (let i = 0; i < GameObject.length; i++) {
        //GameObject[i].update(secondsPassed)
    }
    //clear previous or update current??

    //Draw new or upodate objects?
       for (let i = 0; i < GameObject.length; i++){
        GameObject[i].drawObject();
    }
} */

window.onload = ()=> {
    //Detect Screen Size, Set Game Size, and Center
    mapSize(visualViewport.width, visualViewport.height);
    //Set initial game level until we can detect it
    GameLevel=1;
    //Generate game screen
    createGameWorld();
    //Prepare inventory area
    inventory = newInventory(theGameWindow);
    //Set initial Position for Main Character to center of grass area
    greenCharacter.Xpos=horizontalOffSet+(widthOfGrass/2);
    greenCharacter.Ypos=verticalOffSet+(heightOfGrass/2);
    greenCharacter.drawObject(); //Set main character initial spawn point
};

