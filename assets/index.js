//Set global Variables
var GameMapSize; //Value 1 Mobile 350x650, Value 2 Tablet 700x1000, Value 3 Desktop 900x1300
var GameLevel; //Value 1-3 -  3 total levels.
var Horizon = 0; //Mobile 200px, Tablet 300px, Desktop 400px
let secondsPassed = 0; 
let oldTimeStamp = 0;
var greenCharacter = new mainCharacter('Main', 'assets/img/green-character/static.gif', 0, 0, 25); //Set Main Character Object
let daBoulders = new Array;
let daGems = new Array;

//Variable for movement management
//let charCoords = [100, 100, 25]; // Xpos, Ypos, Zpos 

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
      default:
        return; // Quit when this doesn't handle the key event.
    }
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);
  // The last option dispatches the event to the listener first,
  // Then dispatches event to window
  document.addEventListener("keyup",function(event){
    greenCharacter.moveChar(0, 0, 0, null) // Reset Character to static state when it is not moving
  })

function gameLoop(timeStamp){
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    //Loop over all game objects
    for (let i = 0; i < GameObject.length; i++) {
        //GameObject[i].update(secondsPassed)
    }
    //clear previous or update current??

    //Draw new or upodate objects?
/*     for (let i = 0; i < GameObject.length; i++){
        GameObject[i].drawObject();
    } */
}

 

window.onload = ()=> {
    //Detect Screen Size, Set Game Size, and Center
    mapSize(visualViewport.width, visualViewport.height);
    //Set initial game level until we can detect it
    GameLevel=1;
    //Tile Background based on Screen Size
    tileBackground('./assets/img/offset100.svg', -50, -50, 0, visualViewport.width/50, visualViewport.height/50, horizontalOffSet, verticalOffSet);
    tileBackground('./assets/img/grass100.svg', horizontalOffSet-50, verticalOffSet-50, 1, widthOfGrass/50, heightOfGrass/50, horizontalOffSet, verticalOffSet);
    tileBackground('./assets/img/sky100.svg', horizontalOffSet-50, Horizon-verticalOffSet-50, 5, widthOfGrass/50, heightOfSky/50, horizontalOffSet, verticalOffSet);
    //Border Game Window
    gameWindow(horizontalOffSet, verticalOffSet, 10, widthOfGrass, heightOfGrass+heightOfSky, horizontalOffSet, verticalOffSet);
    console.log("HZ is" + horizontalOffSet + "-"+ (horizontalOffSet+widthOfGrass) + "| VZ is "+ verticalOffSet + "-" + heightOfGrass)
    createGameWorld();
    //Set initial Position for Main Character
    greenCharacter.Xpos=horizontalOffSet;
    greenCharacter.Ypos=verticalOffSet;
    greenCharacter.drawObject(); //Set Main Character Intial Load
};

