//Function to detect objects touching
function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    //Check x and y for overlap
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
        return false;
    }
    return true;
}

//Fuction for detecting collisions of things for objects other than the main character
function detectCollisions(gameObject){
    let obj1;
    let obj2;

    //Reset collision state of all objects
    for (let i = 0; i < gameObject.length; i++){
        gameObject[i].isColliding = false;
    }

    //Start checking for collisions
    for (let i = 0; i < gameObject.length; i++){
        obj1 = gameObject[i];
        for (let o = i + 1; o < gameObject.length; o++){
            obj2 = gameObject[o];
            // Compare object1 with object2
            if (rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)){
                obj1.isColliding = true;
                obj2.isColliding = true;
            }
        }
    }
    return gameObject
}

function pushObjects(object1, Object2){
    object1.push.apply(object1, Object2);
    return object1;
}

function moveGem(i){

    let inventory = document.getElementById('inventory')
        //console.log("Needed for first row " + gemsCollected + "<" + Math.floor(((widthOfGrass)/100)))
        //console.log("Needed for 2nd row " + gemsCollected + ">=" + Math.floor(((widthOfGrass)/100)) + " and " + gemsCollected + " < " + Math.floor((widthOfGrass*2/100)+2))
        //This is not the first gem collected this game, find off set for gem position
        if (gemsCollected <= Math.floor(((widthOfGrass)/100))){
            //Add a gem to the first row
            allGameObjects[i].xPos = Math.floor((10+parseInt(inventory.style.left))+((100*gemsCollected)-100))
            allGameObjects[i].yPos = (heightOfGrass+heightOfSky)-70
            allGameObjects[i].zPos = parseInt(inventory.style.zIndex)
            allGameObjects[i].context.style.left = allGameObjects[i].xPos +"px"
            allGameObjects[i].context.style.bottom = allGameObjects[i].yPos +"px"
            allGameObjects[i].context.style.zIndex = allGameObjects[i].zPos
            //console.log("Setting first row gems " + allGameObjects[i].xPos + " xPos | " + allGameObjects[i].yPos + " yPos | " + allGameObjects[i].zPos + " zPos" )
        } else if (gemsCollected > Math.floor(((widthOfGrass)/100)) && gemsCollected <= Math.floor((widthOfGrass*2/100))){
            //Add gem to 2nd row
            //console.log("Row 2 Gem " + Math.floor((10+parseInt(inventory.style.left))+((100*(gemsCollected - (widthOfGrass/100))-100)))) 
            allGameObjects[i].xPos = Math.floor((10+parseInt(inventory.style.left))+((100*(gemsCollected - (widthOfGrass/100))-100)))
            allGameObjects[i].yPos = (heightOfGrass+heightOfSky)-170
            allGameObjects[i].zPos = parseInt(inventory.style.zIndex)
            allGameObjects[i].context.style.left = allGameObjects[i].xPos +"px"
            allGameObjects[i].context.style.bottom = allGameObjects[i].yPos +"px"
            allGameObjects[i].context.style.zIndex = allGameObjects[i].zPos
            //console.log("Setting 2nd row gems " + allGameObjects[i].xPos + " xPos | " + allGameObjects[i].yPos + " yPos | " + allGameObjects[i].zPos + " zPos" )
        } else if (gemsCollected > Math.floor((widthOfGrass*2/100)+2)){
            //Add gem to 3rd row
            allGameObjects[i].xPos = Math.floor((10+parseInt(inventory.style.left))+((100*(gemsCollected - (widthOfGrass*2/100))-100)))
            allGameObjects[i].yPos = (heightOfGrass+heightOfSky)-270
            allGameObjects[i].zPos = parseInt(inventory.style.zIndex)
            allGameObjects[i].context.style.left = allGameObjects[i].xPos +"px"
            allGameObjects[i].context.style.bottom = allGameObjects[i].yPos +"px"
            allGameObjects[i].context.style.zIndex = allGameObjects[i].zPos
            //console.log("Setting 3rd row gems " + allGameObjects[i].xPos + " xPos | " + allGameObjects[i].yPos + " yPos | " + allGameObjects[i].zPos + " zPos" )
        }
}

//Fuction to pick a random gem image after digging a boulder
function rollGem(i){
    let x = getRandomInt(0, 10);
    //console.log ('Gem Roll ' + x)
    switch (x) {
        // Rock
        case 0:
            allGameObjects[i].name = "Rock"
            allGameObjects[i].ID = "rock"+i
            allGameObjects[i].cName = "Rock"
            allGameObjects[i].ImgAssest="assets/img/rock.png"
            allGameObjects[i].height = 50;
            allGameObjects[i].width = 50;
        // White Gem
        case 1:
            allGameObjects[i].name ="Gem"
            allGameObjects[i].ID = "gem"+i
            allGameObjects[i].cName = "gem"
            allGameObjects[i].ImgAssest="assets/img/gem1.png"
            
        break;
        // Blue Gem
        case 2:
            allGameObjects[i].name ="Gem"
            allGameObjects[i].ID = "gem"+i
            allGameObjects[i].cName = "gem"
            allGameObjects[i].ImgAssest="assets/img/gem2.png"
        break;
        // Green Gem
        case 3:
            allGameObjects[i].name ="Gem"
            allGameObjects[i].ID = "gem"+i
            allGameObjects[i].cName = "gem"
            allGameObjects[i].ImgAssest="assets/img/gem3.png"
        break;
        // Red Gem
        case 4:
            allGameObjects[i].name ="Gem"
            allGameObjects[i].ID = "gem"+i
            allGameObjects[i].cName = "gem"
            allGameObjects[i].ImgAssest="assets/img/gem4.png"
        break;
        // Orange Gem
        case 5:
            allGameObjects[i].name ="Gem"
            allGameObjects[i].ID = "gem"+i
            allGameObjects[i].cName = "gem"
            allGameObjects[i].ImgAssest="assets/img/gem5.png"
        break;
        // Yellow Gem
        case 6:
            allGameObjects[i].name ="Gem"
            allGameObjects[i].ID = "gem"+i
            allGameObjects[i].cName = "gem"
            allGameObjects[i].ImgAssest="assets/img/gem6.png"
        break;
        // Purple Gem
        case 7:
            allGameObjects[i].name ="Gem"
            allGameObjects[i].ID = "gem"+i
            allGameObjects[i].cName = "gem"
            allGameObjects[i].ImgAssest="assets/img/gem7.png"
        break;
        // Black Gem
        case 8:
            allGameObjects[i].name ="Gem"
            allGameObjects[i].ID = "gem"+i
            allGameObjects[i].cName = "gem"
            allGameObjects[i].ImgAssest="assets/img/gem8.png"
        break;
        // Rock
        case 9:
            allGameObjects[i].name ="Rock"
            allGameObjects[i].ID = "rock"+i
            allGameObjects[i].cName = "Rock"
            allGameObjects[i].ImgAssest="assets/img/rock.png"
            allGameObjects[i].height = 50;
            allGameObjects[i].width = 50;
        break;
        // Rock
        case 10:
            allGameObjects[i].name ="Rock"
            allGameObjects[i].ID = "rock"+i
            allGameObjects[i].cName = "Rock"
            allGameObjects[i].ImgAssest="assets/img/rock.png"
            allGameObjects[i].height = 50;
            allGameObjects[i].width = 50;
        break;
        default:
            return; //Quit when this doesn't handle the key event.
        }
}

//Function to fade in game objects, mostly for gems.
function fadeIn(gameObject) {
    let op = 0.1;  //Set Initial opacity
    let timer = setInterval(function () {
        if (op.toFixed(1) >= 1){
            //console.log('Reseting Timer ' + op.toFixed(1))
            clearInterval(timer);
        }
        gameObject.context.style.opacity = `${op.toFixed(1)}`;
        op += 0.1;
    }, 10);
    return gameObject;
}

//Function to trigger moveement tranistion of gem to inventory.
function triggerGem(gameObject) {
    let op = 0.1;
    let timer = setInterval(function () {
        if (op.toFixed(1) >= 1){
            clearInterval(timer);
        }
        gameObject.context.style.opacity = 1;
        op += 0.1;
    }, 10);
    return gameObject;
}

//Function to set timer delay for transaition to new level
function resetLevelTimer(){
    oldTimeStamp = oldTimeStamp - 1;
    if (oldTimeStamp >= 0){
        let update  = document.getElementById("timer")
        update.style.fontSize="3rem"
        //update.textContent = "Starting level "+ GameLevel + " in "+ oldTimeStamp;
        update.innerText = "Starting level "+ GameLevel + " in "+ oldTimeStamp;
        //document.body.append(update.textContent)
    } else {
        clearInterval(leveltimer);
        setTimeout(startGame(), 1000);   
    }
}

//Function to tranistion to a new level
function newLevel(){
    if (GameLevel >=5){
        GameLevel = 1;
        gamesPlayed += 1;
        resetGame();
    } else {
        gemsCollected = 0; //Create variable for tracking collected gems
        for (let i = 0; i < allGameObjects.length; i++){
            console.log("Moving Object # "+ allGameObjects[i].ID)
            let update = document.getElementById(allGameObjects[i].ID)
            update.style.visibility = "hidden";
            update.style.left = "0px";
            update.style.bottom = "0px";
            update.style.zIndex = "-1";
            update.remove();
        }
        //console.log("Game Object length before splice " + allGameObjects.length)
        let x = (allGameObjects.length)
        for (let i = 0; i < x; i++){
            allGameObjects.splice(0,1);
        }
        //console.log("Game Object length before reset " + allGameObjects.length)
        //console.log(allGameObjects)
        allGameObjects = createBoulders();
        //Reset Position for Main Character to center of grass area
        greenCharacter.xPos=horizontalOffSet+(widthOfGrass/2);
        greenCharacter.yPos=verticalOffSet+(heightOfGrass/2);
        greenCharacter.moveChar(0, 0, 0, null); //Set main character initial spawn point
        oldTimeStamp = 10;
        leveltimer = setInterval(resetLevelTimer, 1000);
        resetLevelTimer();
        //console.log("Ready to staet the next level")
    }
}

function checkGameStatus(){
    GameLevel += 1
    if (GameLevel < 5){
        document.getElementById('resetButton').style.visibility = "hidden";
        document.getElementById('showInstructions').style.visibility = "hidden";
        document.getElementById('playButton').style.visibility = "hidden";
        //console.log("Calling newLevel Function, current level is " + GameLevel)
        newLevel();
    } else {
        GameLevel = 1;
        gamesPlayed += 1;
        document.getElementById('resetButton').style.visibility = "visible";
        document.getElementById('showInstructions').style.visibility = "hidden";
        document.getElementById('playButton').style.visibility = "hidden";
        let update  = document.getElementById('timer')
        update.style.fontSize="4rem"
        update.innerText = "You Win!";
    }
}

function checkWinStatus(){
    let b = 0;
    let r = 0;
    let g = 0;
    for (let i = 0; i < allGameObjects.length; i++){
        if (allGameObjects[i].name == "Boulder"){
            b += 1;
        } else if (allGameObjects[i].name == "Rock"){
            r += 1;
        } else if (allGameObjects[i].name == "Gem"){
            g += 1;
        }
    } 
    //console.log("There are " + b + " boulders remaining and "+ gemsCollected +" gems collected")
    if (b <= 0 && gemsCollected == g){
        clearInterval(secondsPassed);
        gameState = 0;
        //console.log("You win!");
        return true;
    } else {
        //console.log("There are " + b + " boulders remaining, looping")
        return false;
    }
}

function resetGame(){
    gemsCollected = 0; //Create variable for tracking collected gems
    for (let i = 0; i < allGameObjects.length; i++){
        let update = document.getElementById(allGameObjects[i].ID)
        update.style.visibility = "hidden";
        update.style.left = "0px";
        update.style.bottom = "0px";
        update.style.zIndex = "-1";
        update.remove();
    }
    //console.log("Game Object length before splice " + allGameObjects.length)
    let x = (allGameObjects.length)
    for (let i = 0; i < x; i++){
        allGameObjects.splice(0,1);
    }
    //console.log("Game Object length before reset " + allGameObjects.length)
    //console.log(allGameObjects)
    allGameObjects = createBoulders();
    //Reset Position for Main Character to center of grass area
    greenCharacter.xPos=horizontalOffSet+(widthOfGrass/2);
    greenCharacter.yPos=verticalOffSet+(heightOfGrass/2);
    greenCharacter.moveChar(0, 0, 0, null); //Set main character initial spawn point
    //Reset Button visibility
    document.getElementById('playButton').style.visibility = "visible";
    document.getElementById('resetButton').style.visibility = "hidden";
    document.getElementById('showInstructions').style.visibility = "visible";
    //Reset text window
    let update  = document.getElementById("timer")
    update.style.fontSize="1rem"
    update.innerText = "";
    if (GameLevel >=5){
        GameLevel = 1;
        gamesPlayed += 1;
    }
}