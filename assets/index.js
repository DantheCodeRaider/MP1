//Set global Variables
var GameMapSize; //Value 1 Mobile 350x650, Value 2 Tablet 700x1000, Value 3 Desktop 900x1200
var GameLevel = 1; //Value 1-5 -  4 total levels.
var Horizon = 0; //Mobile 200px, Tablet 300px, Desktop 400px
let secondsPassed = 0;  //Interval variable
let oldTimeStamp = 0; //Variable for keep track of time remaining on timer
var greenCharacter = new mainCharacter('greenCharacter', 'greenCharacter', 'greenCharacter', 'Main', 'assets/img/green-character/static.gif', 0, 0, 100, 2); //Set Main Character Object
var allGameObjects; //Create Object to track all objects
var theGameWindow; //Create variable for game window tracking
var theTimerWindow; //Create variable for timer window tracking
var theInstructionsWindow //Create variable for instructions window tracking
var inventory; //Create variable for inventory tracking
var gemsCollected = 0; //Create variable for tracking collected gems
var gamesPlayed = 0; //Variable to keep track of games played
let leveltimer; //Variable for keeping track of time between levels
let gameState=0; //Variable for tracking game state. 1 active,  0 inactive.

//Variables to determine screen size for background images
let verticalOffSet = 0;
let horizontalOffSet = 0;
let heightOfSky = 0;
let heightOfGrass = 0;
let widthOfGrass = 0;

//Event listener to move the Green Character
window.addEventListener("keydown", function (event) {

    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
      switch (event.key) {
          // Code for "down arrow" key press.
          case "ArrowDown":
            if (gameState == 1) {
            greenCharacter.moveChar(0, -50, 0, "South") // Move Green Character Down (South)
            }
          break;
            // Code for "S" key press.
          case "S":
            if (gameState == 1) {
            greenCharacter.moveChar(0, -50, 0, "South") // Move Green Character Down (South)
            }
          break;
            // Code for "s" key press.
          case "s":
            if (gameState == 1) {
            greenCharacter.moveChar(0, -50, 0, "South") // Move Green Character Down (South)
            }
          break;
          case "ArrowUp":
            // Code for "up arrow" key press.
            if (gameState == 1) {
            greenCharacter.moveChar(0, 50, 0, "North") // Move Green Character Up (North)
            }
          break;
          case "W":
            // Code for "W" key press.
            if (gameState == 1) {
            greenCharacter.moveChar(0, 50, 0, "North") // Move Green Character Up (North)
            }
          break;
          case "w":
            // Code for "w" key press.
            if (gameState == 1) {
            greenCharacter.moveChar(0, 50, 0, "North") // Move Green Character Up (North)
            }
          break;
          case "ArrowLeft":
            // Code for "left arrow" key press.
            if (gameState == 1) {
            greenCharacter.moveChar(-50, 0, 0, "West") // Move Green Character Left (West)
            }
          break;
          case "A":
            // Code for "A" key press.
            if (gameState == 1) {
            greenCharacter.moveChar(-50, 0, 0, "West") // Move Green Character Left (West)
            }
          break;
          case "a":
            // Code for "a" key press.
            if (gameState == 1) {
            greenCharacter.moveChar(-50, 0, 0, "West") // Move Green Character Left (West)
            }
          break;
          case "ArrowRight":
            // Code for "right arrow" key press.
            if (gameState == 1) {
            greenCharacter.moveChar(50, 0, 0, "East") // Move Green Character Right (East)
            }
          break;
          case "D":
            // Code for "D" key press.
            if (gameState == 1) {
            greenCharacter.moveChar(50, 0, 0, "East") // Move Green Character Right (East)
            }
          break;
          case "d":
            // Code for "d" key press.
            if (gameState == 1) {
            greenCharacter.moveChar(50, 0, 0, "East") // Move Green Character Right (East)
            }
          break;
          case " ": 
            // Code for "Spacebar" key press.
            //console.log('Spacebar!')
            if (gameState == 1) {
            greenCharacter.dig()
            }
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

//Load game
window.onload = ()=> {
    //Detect Screen Size, Set Game Size, and Center
    mapSize(visualViewport.width, visualViewport.height);
    //Generate game screen
    createGameWorld();
    //Prepare inventory area
    inventory = newInventory(theGameWindow);
    //Set initial Position for Main Character to center of grass area
    greenCharacter.xPos=horizontalOffSet+(widthOfGrass/2);
    greenCharacter.yPos=verticalOffSet+(heightOfGrass/2);
    greenCharacter.drawObject(); //Set main character initial spawn point 
};

