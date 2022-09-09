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
        console.log("Screen Width " + screenWidth+ "| Screen Hieght " + screenHieght + "| Set Game Map Size to 700x1000" + "| Game Map " + GameMapSize)
        GameMapSize = 2

        //Set Horizon height
        Horizon = setHorizon(screenHieght, 300)
        console.log('Horizon ' + Horizon)

        //Set HorizontalOffSet
        horizontalOffSet = setHorizontalOffSet(screenWidth)

        //Set Vertical Off Set
        verticalOffSet = setVerticalOffSet(screenHieght)

        //Set Variables for how big an area to tile for the game map
        heightOfSky = (window.innerHeight-Horizon)-(verticalOffSet*2)
        heightOfGrass = Horizon + 50
        widthOfGrass = window.innerWidth - (horizontalOffSet*2)
    } else {
        //Map Size will be 350px by 650px
        console.log("Screen Width " + screenWidth+ "| Screen Hieght " + screenHieght + "| Set Game Map Size to 350x650" + "| Game Map " + GameMapSize)
        GameMapSize = 1
        
        //Set Horizon height
        Horizon = setHorizon(screenHieght, 200)
        console.log('Horizon ' + Horizon)
        
        //Set HorizontalOffSet
        horizontalOffSet = setHorizontalOffSet(screenWidth)

        //Set Vertical Off Set
        verticalOffSet = setVerticalOffSet(screenHieght)

        //Set Variables for how big an area to tile for the game map
        heightOfSky = (window.innerHeight-Horizon)-(verticalOffSet*2) 
        heightOfGrass = Horizon + 50 - (verticalOffSet)
        widthOfGrass = window.innerWidth - (horizontalOffSet*2)
        
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
function tileBackground(ImgAssest, Xpos, Ypos, Zpos, width, height, hOffSet, vOffSet){
    for(let h = 1; h < height; h++){
        for(let w = 1; w < width; w++){
            newImage(ImgAssest, Xpos + w*50, Ypos + h*50, Zpos)
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
function newImage (ImgAssest, Xpos, Ypos, Zpos) {
    let nImg = document.createElement('img')
    nImg.src = ImgAssest
    nImg.style.position = 'fixed'
    nImg.style.left = Xpos +'px'
    nImg.style.bottom = Ypos +'px'
    nImg.style.Zpos = Zpos
    document.body.append(nImg)
    return nImg
}

//Function for placing Game Window Div with border, center on player screen
function gameWindow(Xpos, Ypos, Zpos, width, height, hOffSet, vOffSet){
    let mDiv = document.querySelector('main')
    let nDiv= document.createElement('Div')
    nDiv.className = 'gameWindow'
    nDiv.style.position = 'fixed'
    nDiv.style.bottom = vOffSet-10 +'px'
    nDiv.style.width = 10+width+"px"
    nDiv.style.height = 10+height+"px"
    nDiv.style.zIndex = Zpos
    nDiv.style.border = "solid 5px White"
    nDiv.style.textAlign = "Center"
    nDiv.style.justifyContent = "Center"
    nDiv.style.margin = "Auto"
    mDiv.append(nDiv)
}

function randomXnumber(){
    if (GameMapSize == 3 || GameMapSize ==2){
        let x = Math.floor(Math.random() * (visualViewport.width)); //generate a number for a new random xPOS for 100px boulder
        while ((x <= (horizontalOffSet)) || ( x >= ((horizontalOffSet-100)+widthOfGrass))){
            x = Math.floor(Math.random() * (visualViewport.width));
        }
        //console.log("Returning X "+ x)
        return x;
    } else {
        let x = Math.floor(Math.random() * (visualViewport.width)); //generate a number for a new random xPOS 50px boulder
        while ((x <= (horizontalOffSet)) || ( x >= ((horizontalOffSet-50)+widthOfGrass))){
            x = Math.floor(Math.random() * (visualViewport.width));
        }
        //console.log("Returning X "+ x)
        return x;
    }
}   

function randomYnumber(){
    let y = Math.floor(Math.random() * (visualViewport.height)); //generate a number for a new random xPOS
    while (y <= (verticalOffSet) || (y >= (heightOfGrass))){
        y = Math.floor(Math.random() * (visualViewport.height));
    }
    //console.log("Returning Y "+ y)
    return y;
}  

function moveBoulders(gameObject){
//Set a default object as a place holder for character spawn point
let obj1 = {Xpos:0, Ypos:0, width:0, height:0};
obj1.Xpos = horizontalOffSet+(widthOfGrass/2);
obj1.Ypos = verticalOffSet+(heightOfGrass/2);
obj1.height = 100;
obj1.width = 100;
gameObject.Xpos = randomXnumber();
gameObject.Ypos = randomYnumber();
    //let squareDistance = (gameObject.Xpos-Xcenter)*(gameObject.Xpos-Xcenter) + (gameObject.Ypos-Ycenter)*(gameObject.Ypos-Ycenter);
    //keep center of grass area open for main character
    if (rectIntersect(obj1.Xpos, obj1.Ypos, obj1.width, obj1.height, gameObject.Xpos, gameObject.Ypos, gameObject.width, gameObject.height)){
        //console.log('Reroll Xpos ' + gameObject.Xpos + ' | ' + gameObject.Ypos)
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
            if (rectIntersect(obj1.Xpos, obj1.Ypos, obj1.width, obj1.height, obj2.Xpos, obj2.Ypos, obj2.width, obj2.height)){
                obj1.isColliding = true;
                obj2.isColliding = true;
                gameObject[o] = moveBoulders(obj2)
                obj2 = gameObject[o];
                //console.log('Obj1 X/Y ' + obj1.Xpos +','+ obj1.Ypos + ' H/W ' +  obj1.width +','+obj1.height + ' | Obj2 X/Y ' + obj2.Xpos +','+ obj2.Ypos + ' H/W ' +  obj2.width +','+obj2.height)
                //console.log('Reroll Xpos ' + gameObject[o].Xpos + ' | ' + gameObject[o].Ypos)
            }
        }
    }
    return gameObject
}

function createBoulders(){
//Generate a number of boulders (possible gems) based on the contant of 5 + game map size + game level
    if (GameMapSize == 3 || GameMapSize == 2){
        //Generate Random 100px Boulders 
        //createBoulders(GameMapSize) 
        for (let i = 0; i < (10+GameMapSize+GameLevel); i++){
            daBoulders[i] = new GameObject("Boulder", "Boulder", "./assets/img/boulder100.svg", 0, 0, 50, 0, 0, 1);
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
            daBoulders[i] = new GameObject("Boulder", "Boulder", "./assets/img/boulder50.svg", 0, 0, 50, 0, 0, 1);
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

function createGameWorld(){
    //Generate a number of boulders (possible gems) based on the contant of 5 + game map size + game level
    allGameObjects = createBoulders();
}
