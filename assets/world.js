//Detect Screen Size, Set Game Size, and set Game Window
//Find out browser width to set game map size.
function mapSize(screenWidth, screenHieght) {
    if (screenWidth>=900){
        //Map Size will be 900px by 1200px
        GameMapSize = 3
        console.log("Screen Width " + screenWidth+ "| Screen Hieght " + screenHieght + "| Set Game Map Size to 900x1200" + "| Game Map " + GameMapSize)
        
        //Set Horizontal Off Set
        horizontalOffSet = setHorizontalOffSet(screenWidth)
   
        //Set Vertical Off Set
        verticalOffSet = setVerticalOffSet(screenHieght)

        //Set Horizon height
        Horizon = setHorizon(screenHieght, 400)
        console.log('Horizon ' + Horizon)

        //Set Variables for how big an area to tile for the game map
        heightOfSky = 400
        heightOfGrass = 800
        widthOfGrass = 900
        //console.log('HeightofSky '+ heightOfSky)
        //console.log('heightOfGrass '+ heightOfGrass)
    } else if (screenWidth>=700){
        //Map Size will be 700px by 1000px
        GameMapSize = 2
        console.log("Screen Width " + screenWidth+ "| Screen Hieght " + screenHieght + "| Set Game Map Size to 700x1000" + "| Game Map " + GameMapSize)
 

        //Set Horizon height
        Horizon = setHorizon(screenHieght, 300)
        console.log('Horizon ' + Horizon)

        //Set HorizontalOffSet
        horizontalOffSet = setHorizontalOffSet(screenWidth)

        //Set Vertical Off Set
        verticalOffSet = setVerticalOffSet(screenHieght)

        //Set Variables for how big an area to tile for the game map
        heightOfSky = 300
        heightOfGrass = 700
        widthOfGrass = 700
    } else {
        //Map Size will be 350px by 650px
        GameMapSize = 1
        console.log("Screen Width " + screenWidth+ "| Screen Hieght " + screenHieght + "| Set Game Map Size to 350x650" + "| Game Map " + GameMapSize)
        
        
        //Set Horizon height
        Horizon = setHorizon(screenHieght, 200)
        console.log('Horizon ' + Horizon)
        
        //Set HorizontalOffSet
        horizontalOffSet = setHorizontalOffSet(screenWidth)

        //Set Vertical Off Set
        verticalOffSet = setVerticalOffSet(screenHieght)

       //Set Variables for how big an area to tile for the game map
       heightOfSky = 200
       heightOfGrass = 450
       widthOfGrass = 350
        
    }
}

function setHorizon (screenHieght, hzn){
    let h = screenHieght-hzn
    return h 
}

function setVerticalOffSet(screenHieght){
//Check to ensure window height is as expected
let vOS = 0
if (screenHieght > 1200 && GameMapSize == 3) {
    vOS = (screenHieght-1200)/2
} else if (screenHieght > 1000 && GameMapSize == 2){
    vOS = (screenHieght-1000)/2
} else if (screenHieght > 650 && GameMapSize == 1) {
    vOS = (screenHieght-650)/2
} else {
    vOS = 0
}
return vOS
}

function setHorizontalOffSet(screenWidth){
//Check to ensure window width is as expected
let hOS = 0
if (screenWidth > 900 && GameMapSize == 3) {
    hOS = (screenWidth-900)/2
} else if (screenWidth > 700 && GameMapSize == 2) {
    hOS = (screenWidth-700)/2
} else if (screenWidth > 350 && GameMapSize == 1) {
    hOS = (screenWidth-350)/2
} else {
    hOS = 0
}
return hOS
}

//Function for placing background images throughout the browser
function tileBackground(ImgAssest, xPos, yPos, zPos, width, height, hOffSet, vOffSet){
    for(let h = 0; h < height; h++){
        for(let w = 0; w < width; w++){
            newImage(ImgAssest, xPos + w*100, yPos + h*100, zPos)
            //Stop the madness
            if (w > 500) {
                w = width
                h = height
            } else if ( h > 500) {
                w = width
                h = height
            }
        }
    }
}

//Function for placing static images throughout the browser
function newImage (ImgAssest, xPos, yPos, zPos) {
    let nImg = document.createElement('img')
    nImg.className = 'background'
    nImg.src = ImgAssest
    nImg.style.position = 'fixed'
    nImg.style.left = xPos +'px'
    nImg.style.bottom = yPos +'px'
    nImg.style.zPos = zPos
    document.body.append(nImg)
    return nImg
}

//Function for placing Game Window Div with border, center on player screen
function gameWindow(xPos, yPos, zPos, width, height, hOffSet, vOffSet){
    let mDiv = document.querySelector('main');
    let nDiv = document.createElement('Div');
    nDiv.className = 'gameWindow';
    nDiv.id = 'gameWindow';
    nDiv.style.position = 'fixed';
    nDiv.style.bottom = vOffSet-10 +"px";
    nDiv.style.width = 10+width+"px";
    nDiv.style.height = 10+height+"px";
    nDiv.style.zIndex = zPos;
    nDiv.style.border = "solid 5px White";
    nDiv.style.textAlign = "Center";
    nDiv.style.justifyContent = "Center";
    nDiv.style.margin = "Auto";
    mDiv.append(nDiv);
    return nDiv;
}

//Function for placing Timer Window Div and elements on player screen
function timerWindow(xPos, yPos, zPos, width, height, hOffSet, vOffSet){
    let gDiv = document.getElementById('gameWindow');
    let tDiv = document.createElement('Div');
    tDiv.className = 'timerWindow';
    tDiv.id = 'timerWindow';
    tDiv.style.position = 'fixed';
    tDiv.style.left = xPos+"px";
    tDiv.style.bottom = yPos+"px";
    tDiv.style.width = 10+width+"px";
    tDiv.style.height = 10+height+"px";
    tDiv.style.zIndex = zPos;
    //tDiv.style.border = "solid 5px Red";
    //tDiv.style.textAlign = "Center";
    //tDiv.style.justifyContent = "Center";
    tDiv.innerHTML = `<p><button id="showInstructions" onclick="showInstructions()">Instructions</button></p><p><button id="playButton" onclick="startGame()">  Start Game  </button></p>
    <p><button id="resetButton" onclick="resetGame()">  Reset Game  </button></p><p><span id="timer"></span></p>`
    gDiv.append(tDiv);
    return tDiv;
}

//Function for placing instructions Window Div and elements on player screen
function instructionsWindow(xPos, yPos, zPos, width, height, hOffSet, vOffSet){
    let gDiv = document.getElementById('gameWindow');
    let iDiv = document.createElement('Div');
    iDiv.className = 'instructionsWindow';
    iDiv.id = 'instructionsWindow';
    iDiv.style.position = 'fixed';
    iDiv.style.left = xPos+"px";
    iDiv.style.bottom = yPos+"px";
    iDiv.style.width = 10+width+"px";
    iDiv.style.height = 10+height+"px";
    iDiv.style.zIndex = zPos;
    iDiv.style.border = "solid 5px Red";
    iDiv.style.textAlign = "Center";
    iDiv.style.justifyContent = "Center";
    iDiv.innerHTML = `<p>Use either option displayed below to move your Avatar.</p><img src="./assets/img/movement.png" alt="Movement Keys"><p>Use spacebar to dig for gems. Collect all the gems before the time runs out to progress to the next level. 
    Beat all the levels to win!</p><p id="screenSize"></p><p><button id="hideInstructions" onclick="hideInstructions()"> Close Window </button></p>`
    gDiv.append(iDiv);
    return iDiv;
}

function randomXnumber(){
    if (GameMapSize == 3 || GameMapSize ==2){
        let x = Math.floor(Math.random() * (visualViewport.width)); //generate a number for a new random xPos for 100px boulder
        while ((x <= (horizontalOffSet)) || ( x >= ((horizontalOffSet-100)+widthOfGrass))){
            x = Math.floor(Math.random() * (visualViewport.width));
        }
        //console.log("Returning X "+ x)
        return x;
    } else {
        let x = Math.floor(Math.random() * (visualViewport.width)); //generate a number for a new random xPos 50px boulder
        while ((x <= (horizontalOffSet)) || ( x >= ((horizontalOffSet-50)+widthOfGrass))){
            x = Math.floor(Math.random() * (visualViewport.width));
        }
        //console.log("Returning X "+ x)
        return x;
    }
}   

function randomYnumber(){
    let y = Math.floor(Math.random() * (visualViewport.height)); //generate a number for a new random xPos
    while (y <= (verticalOffSet) || (y >= (heightOfGrass))){
        y = Math.floor(Math.random() * (visualViewport.height));
    }
    //console.log("Returning Y "+ y)
    return y;
}  

function moveBoulders(gameObject){
//Set a default object as a place holder for character spawn point
let obj1 = {xPos:0, yPos:0, width:0, height:0};
obj1.xPos = horizontalOffSet+(widthOfGrass/2);
obj1.yPos = verticalOffSet+(heightOfGrass/2);
obj1.height = 100;
obj1.width = 100;
gameObject.xPos = randomXnumber();
gameObject.yPos = randomYnumber();
    //let squareDistance = (gameObject.xPos-Xcenter)*(gameObject.xPos-Xcenter) + (gameObject.yPos-Ycenter)*(gameObject.yPos-Ycenter);
    //keep center of grass area open for main character
    if (rectIntersect(obj1.xPos, obj1.yPos, obj1.width, obj1.height, gameObject.xPos, gameObject.yPos, gameObject.width, gameObject.height)){
        //console.log('Reroll xPos ' + gameObject.xPos + ' | ' + gameObject.yPos)
        gameObject = moveBoulders(gameObject);
    }
return gameObject
}

function checkBoulders(gameObject){ 
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
            if (rectIntersect(obj1.xPos, obj1.yPos, obj1.width, obj1.height, obj2.xPos, obj2.yPos, obj2.width, obj2.height)){
                obj1.isColliding = true;
                obj2.isColliding = true;
                gameObject[o] = moveBoulders(obj2)
                obj2 = gameObject[o];
                //console.log('Obj1 X/Y ' + obj1.xPos +','+ obj1.yPos + ' H/W ' +  obj1.width +','+obj1.height + ' | Obj2 X/Y ' + obj2.xPos +','+ obj2.yPos + ' H/W ' +  obj2.width +','+obj2.height)
                //console.log('Reroll xPos ' + gameObject[o].xPos + ' | ' + gameObject[o].yPos)
            }
        }
    }
    return gameObject
}

function createBoulders(){
let daBoulders = new Array;
//Generate a number of boulders (possible gems) based on the contant of 5 + game map size + game level
    if (GameMapSize == 3 || GameMapSize == 2){
        //Generate Random 100px Boulders 
        //createBoulders(GameMapSize) 
        for (let i = 0; i < (10+GameMapSize+GameLevel); i++){
            daBoulders[i] = new GameObject("Boulder", "boulder"+i, "boulder", "Boulder", "./assets/img/boulder100.svg", 0, 0, 50, 0, 0, 1);
            //Set default hieght and width
            daBoulders[i].width = 100;
            daBoulders[i].height = 100;
            moveBoulders(daBoulders[i]);
        }
        //Check for overlapping 100px Boulders
        for (let i = 0; i < 10; i++){
            checkBoulders(daBoulders)
        }
            
        //Draw Random 100px Boulders
        for (let i = 0; i < daBoulders.length; i++){
            daBoulders[i].drawObject();
        }
        } else {
        //Generate Random 50px Boulders
        for (let i = 0; i < (10+GameMapSize+GameLevel); i++){
            daBoulders[i] = new GameObject("Boulder", "boulder"+i, "boulder", "Boulder", "./assets/img/boulder50.svg", 0, 0, 50, 0, 0, 1);
            //Set default hieght and width
            daBoulders[i].width = 50;
            daBoulders[i].height = 50;
            moveBoulders(daBoulders[i]);
        }
        
        //Check for overlapping 100px Boulders
        for (let i = 0; i < 10; i++){
            checkBoulders(daBoulders)
        }

        //Draw Random 50px Boulders
        for (let i = 0; i < daBoulders.length; i++){
            daBoulders[i].drawObject();
        }
    }
    return daBoulders
}

function newInventory(theGameWindow){
    let inventory = document.createElement('div')
    inventory.className = "inventory";
    inventory.id = "inventory";
    inventory.style.position = 'fixed';
    inventory.style.bottom = Horizon-verticalOffSet+"px";
    inventory.style.left = horizontalOffSet+"px";
    inventory.style.width = widthOfGrass+"px";
    inventory.style.height = heightOfSky+"px";
    inventory.style.display = 'flex';
    inventory.style.flexDirection = 'row';
    inventory.style.alignItems = 'left';
    inventory.style.justifyContent = 'space-evenly';
    inventory.style.zIndex = '25';
    theGameWindow.append(inventory);
    return inventory;
}

function showInstructions(){
    theTimerWindow.style.visibility = "hidden";
    theTimerWindow.style.style,zIndex = 0;
    theTimerWindow.append();
    theInstructionsWindow.style.visibility = "visible";
    theInstructionsWindow.style,zIndex = 100;
    theInstructionsWindow.append();
}

function hideInstructions(){
    theInstructionsWindow.style.visibility = "hidden";
    theInstructionsWindow.style,zIndex = 0;
    theInstructionsWindow.append();
    theTimerWindow.style.visibility = "visible";
    theTimerWindow.style.style,zIndex = 100;
    theTimerWindow.append();
}

function createGameWorld(){
    //Tile Background based on Screen Size
    tileBackground('./assets/img/offset100.svg', 0, 0, 0, visualViewport.width/100, visualViewport.height/100, horizontalOffSet, verticalOffSet);
    tileBackground('./assets/img/grass100.svg', horizontalOffSet, verticalOffSet, 1, widthOfGrass/100, heightOfGrass/100, horizontalOffSet, verticalOffSet);
    tileBackground('./assets/img/sky100.svg', horizontalOffSet, Horizon-verticalOffSet, 5, widthOfGrass/100, heightOfSky/100, horizontalOffSet, verticalOffSet);
    //Border Game Window
    theGameWindow = gameWindow(horizontalOffSet, verticalOffSet, 1, widthOfGrass, heightOfGrass+heightOfSky, horizontalOffSet, verticalOffSet);
    theTimerWindow = timerWindow((visualViewport.width/2)-((widthOfGrass-10)/4), (Horizon-verticalOffSet), 100, (widthOfGrass-20)/2, (heightOfSky-20)*0.9, horizontalOffSet, verticalOffSet)
    theInstructionsWindow = instructionsWindow((visualViewport.width/2)-(widthOfGrass/4), (Horizon-verticalOffSet), 100, (widthOfGrass/2), (heightOfSky*0.9), horizontalOffSet, verticalOffSet)
    console.log("HZ is " + horizontalOffSet + "-"+ (horizontalOffSet+widthOfGrass) + "| VZ is "+ verticalOffSet + "-" + heightOfGrass)
    //Generate a number of boulders (possible gems) based on the contant of 5 + game map size + game level
    allGameObjects = createBoulders();
    //console.log("Created allGameObjects");
    //console.log(allGameObjects);
    
}

