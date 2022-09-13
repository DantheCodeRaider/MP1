//Establish classes
class GameObject{
    constructor(name, ID, cName, context, ImgAssest, xPos, yPos, zPos, VelX, VelY, state){
        this.name = name //Object name type
        this.ID = ID //Object ID
        this.cName = cName //Object Class
        this.context = context //Used to update browser
        this.ImgAssest = ImgAssest //Used for art assets links
        this.xPos = xPos //X Position
        this.yPos = yPos //Y Position
        this.zPos = zPos //Z Position
        this.VelX = VelX //X Velocity
        this.VelY = VelY //Y Velocity
        this.state = state //0 Hidden, 1 Neutral, 2 Friendly, 3 Hostile

        this.isColliding = false; //Is Colliding (true/false)
        this.isCollidingWithMain = false; //Is Colliding with Main Character (true/false)
    }
    //Function for placing objects throughout the browser
    drawObject() {
        this.context = document.createElement('img')
        this.context.className = this.cName
        this.context.id = this.ID
        this.context.src = this.ImgAssest
        this.context.style.position = 'fixed'
        this.context.style.left = this.xPos +'px'
        this.context.style.bottom = this.yPos +'px'
        this.context.style.zIndex = this.zPos
        //this.context.style.border = 'solid 3px white'
        document.body.append(this.context)
    }
    //Function for replacing objects throughout the browser
    updateObject(oldObjectID) {
        this.context = document.getElementById(oldObjectID)
        //console.log('Initial Context ' + this.context)
        this.context.className = this.cName
        this.context.id = this.ID
        this.context.src = this.ImgAssest
        this.context.style.position = 'fixed'
        this.context.style.left = this.xPos +'px'
        this.context.style.bottom = this.yPos +'px'
        this.context.style.zIndex = this.zPos
        //this.context.style.border = 'solid 3px white'
        if (this.name=="Gem"){
        //If its a gem fade it into view over 5 seconds
        this.context.style.opacity = "0";
        document.body.append(this.context)
        fadeIn(this)
        } else {
        //If its a rock just put it out there
        document.body.append(this.context)
        }
    }
}

class Character extends GameObject {
    constructor(name, ID, cName, context, ImgAssest, xPos, yPos, zPos, velX, VelY){
        super(name, ID, cName, context, ImgAssest, xPos, yPos, zPos, velX, VelY);

        //Set default hieght and width
        this.width = 50;
        this.height = 50;
        this.state = 1; //Neutral
    }
}

class NPC extends Character {
    constructor(name, ID, cName, context, ImgAssest, xPos, yPos, zPos, velX, VelY){
        super(name, ID, cName, context, ImgAssest, xPos, yPos, zPos, velX, VelY);

        //Set NPC Specific settings
        this.ImgAssest = "assets/img/red-character/static.gif"
        this.state = 3; //Hostile
    }
    update(){
        
    }
}

class mainCharacter extends Character {
    constructor(name, ID, cName, context, ImgAssest, xPos, yPos, zPos, velX, VelY){
        super(name, ID, cName, context, ImgAssest, xPos, yPos, zPos, velX, VelY);
        
        //Set defaults
        this.state = 2; //Friendly
    }
    
    //Function for moving mainCharacter around in the game
    moveChar(xPos, yPos, zPos, cDir){
        let preImpact = this
        //console.log('Starting |'+ preImpact.xPos +' xPos |'+ preImpact.yPos + ' yPos' + ' | ' + preImpact.zPos + ' zPos'); 
        this.xPos += xPos //Update xPos
        this.yPos += yPos //Update yPos
        this.zPos += zPos //Update zPos

        //Check for Collisions
        this.detectObjects(cDir)
        if (this.isColliding==true){
            //console.log('I hit something!')
            //his.xPos -= xPos //Update xPos
            //this.yPos -= yPos //Update yPos
        }

        //Keep Character on the map West/East
        if (this.xPos < horizontalOffSet) {
            this.xPos = horizontalOffSet
        } else if (this.xPos >= (widthOfGrass+horizontalOffSet)) {
            this.xPos = (widthOfGrass+horizontalOffSet) - 50
        }
        //Keep Character on the map North/South
        if (this.yPos < verticalOffSet) {
            this.yPos = verticalOffSet
        } else if (this.yPos > (heightOfGrass+verticalOffSet)-50) {
            this.yPos = (heightOfGrass+verticalOffSet)-50
        }
        //Console Logs for bug testing
        //console.log('Ending |'+ this.xPos +' xPos |'+ this.yPos + ' yPos' + ' | ' + this.zPos + ' zPos');
        this.context.style.left = this.xPos+'px';
        this.context.style.bottom = this.yPos +'px';
        this.context.style.zPos = this.zPos
        // Switch case to change character model based on direction of travel
        switch (cDir) {
        // Update character model for moving North
        case "North":
            this.context.src='assets/img/green-character/north.gif'
        break;
        // Update character model for moving South
        case "South":
            this.context.src='assets/img/green-character/south.gif'
        break;
        // Update character model for moving East
        case "East":
            this.context.src='assets/img/green-character/east.gif'
        break;
        // Update character model for moving West
        case "West":
            this.context.src='assets/img/green-character/west.gif'
        break;
        // Update character model for static
        case null:
            this.context.src='assets/img/green-character/static.gif'
        break;
        default:
            return; // Quit when this doesn't handle the key event.
        }
        // Update Character
        //document.body.append(this.context)
        return gemsCollected, allGameObjects;
    }

    //Reset Character to static state when it is not moving
    stopChar(){
        this.context.src='assets/img/green-character/static.gif'
    }
    
    //Check for boulder near by and dig for gems
    dig(){
        let daGems = new Array;
        //Loop through game objects to see if they are close
        for (let i = 0; i < allGameObjects.length; i++){
            //Check to make sure we are looping through only Boulder objects
            if (allGameObjects[i].name == "Boulder"){
                let x1 = this.xPos
                let y1 = this.yPos
                let x2 = allGameObjects[i].xPos
                let y2 = allGameObjects[i].yPos
                //find the distance between the main character a boulder
                let d = Math.floor(Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2)))
                //console.log('Distance to boulder is ' + d)
                if (d < 110){
                    let oldObjectID
                    oldObjectID = allGameObjects[i].ID; 
                    daGems = allGameObjects[i];
                    rollGem(daGems, i)
                    console.log('I found a boulder to hit at ' + allGameObjects[i].xPos + ' ' + allGameObjects[i].yPos)
                    allGameObjects[i] = daGems
                    //console.log(daGems)
                    //console.log(daBoulders[i].cName)
                    //console.log(daBoulders[i].context)
                    //console.log(oldObjectID)
                    allGameObjects[i].updateObject(oldObjectID)
                    //allGameObjects.append(daGems)
                    //allGameObjects.append(daBoulders)
                }
            }
        }
        //return allGameObjects;
    }

    pickUpGem(i) {
        gemsCollected += 1;
        console.log('You Collected ' + gemsCollected +' Gems!')
        //console.log(allGameObjects[i].ID)
            //select the Gem to be moved
             let inventory = document.getElementById('inventory')
             allGameObjects[i].context.className += " "+ inventory.className
             inventory.append(allGameObjects[i].context)
             moveGem(i);
             allGameObjects[i].isColliding=false;
             allGameObjects[i].isCollidingWithMain = false;
             this.isColliding = false;  
             //console.log("Gems Move Object " + allGameObjects[i].ID + " "+ allGameObjects[i].xPos + "xPos | "+ allGameObjects[i].yPos + " yPos | " + allGameObjects[i].zPos + " zPos" )
             inventory.append(allGameObjects[i].context)
             //console.log("allGameObjects[i]")
             //console.log(allGameObjects[i])
    }

    //Function to detect objects touching and determine impact point
    impactPoint(x1, y1, w1, h1, cDir, x2, y2, w2, h2) {
        //Check x and y for overlap
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
            return false;
        }
        switch (cDir) {
            // Update character position for impact moving North
            case "North":
                if (y1 < y2+h2 & x1 < x2+w2 & x1+w1 > x2){ 
                    //Impacted the bottom of an Object
                    this.xPos
                    this.yPos=y2-h1 
                    console.log('Impacted the bottom of an Object while heading North '+ this.xPos +' '+ this.yPos)
                } else if (x1+w1 <= x2){
                    //Impacted the left side of an Object
                    this.xPos=x2-w1
                    this.yPos 
                    console.log('Impacted the left side of an Object while heading North '+ this.xPos +' '+ this.yPos)
                } else if (x1 <= x2+w2) {
                    //Impacted the right side of an Object
                    this.xPos=x2+w2
                    this.yPos 
                    console.log('Impacted the right side of an Object while heading North '+ this.xPos +' '+ this.yPos)
                } else {
                    console.log('Unexpected impact at '+ x1 +' '+ y1)
                }
            break;
            // Update character position for moving South
            case "South":
                if (y1+h1 >= y2+h2 & x1 < x2+w2 & x1+w1 > x2){
                    this.xPos
                    this.yPos=y2+h2 
                    console.log('Impacted the top of an Object while heading South '+ this.xPos +' '+ this.yPos)  
                } else if (x1+w1 <= x2){
                    //Impacted the left side of an Object
                    this.xPos=x2-w1
                    this.yPos 
                    console.log('Impacted the left side of an Object while heading South '+ this.xPos +' '+ this.yPos)
                } else if (x1 >= x2+w2) {
                    //Impacted the right side of an Object
                    this.xPos=x2+w2
                    this.yPos 
                    console.log('Impacted the right side of an Object while heading South '+ this.xPos +' '+ this.yPos)
                } else {
                    console.log('Unexpected impact at '+ x1 +' '+ y1)
                }
            break;
            // Update character position for moving East
            case "East":
                if (x1 <= x2+w2 & y1 < y2+h2 & y1+h1 > y2){ 
                    //Impacted the left side of an Object
                    this.xPos=x2-w1
                    this.yPos
                    console.log('Impacted the left side of an Object while heading East '+ this.xPos +' '+ this.yPos)
                } else if (y1 < y2){ 
                    //Impacted the bottom of an Object
                    this.xPos
                    this.yPos=y2-h1
                    console.log('Impacted the bottom of an Object while heading East '+ this.xPos +' '+ this.yPos)
                } else if (y1+h1 > y2) {
                    //Impacted the top of an Object
                    this.xPos
                    this.yPos=y2+h2 
                    console.log('Impacted the top side of an Object while heading East '+ this.xPos +' '+ this.yPos)
                } else {
                        console.log('Unexpected impact at '+ x1 +' '+ y1)
                }
            break;
            // Update character position for moving West
            case "West":
                if (x1+w1 >= x2+w2 & y1 < y2+h2 & y1+h1 > y2){ 
                    //Impacted the left side of an Object
                    this.xPos=x2+w2
                    this.yPos
                    console.log('Impacted the right side of an Object while heading West '+ this.xPos +' '+ this.yPos)
                } else if (y1 < y2){ 
                    //Impacted the bottom of an Object
                    this.xPos
                    this.yPos=y2-h1
                    console.log('Impacted the bottom of an Object while heading West '+ this.xPos +' '+ this.yPos)
                } else if (y1+h1 > y2) {
                    //Impacted the top of an Object
                    this.xPos
                    this.yPos=y2+h2 
                    console.log('Impacted the top side of an Object while heading West '+ this.xPos +' '+ this.yPos)
                } else {
                    console.log('Unexpected impact at '+ x1 +' '+ y1)
                }
            break;
            // Update character position for ??
            case null:
                console.log('Unexpected impact at '+ x1 +' '+ y1)
            break;
            default:
                return; // Quit when this doesn't handle the key event.
        }
        //console.log('Unexpected impact at '+ x1 +' '+ y1)
        return true;
    }
    //Detect collisions When the Main Character Moves
    detectObjects(cDir){

        //Reset collision state of all objects
        for (let i = 0; i < allGameObjects.length; i++){
            allGameObjects[i].isColliding = false;
            allGameObjects[i].isCollidingWithMain = false;
        }
        //Set Obj 1 as Main Character
        this.isColliding = false;
        this.isCollidingWithMain = false;
        
        //Start checking for collisions
        for (let i = 0; i < allGameObjects.length; i++){
            // Compare object1 with object2
            //if(this.name)
            if (this.impactPoint(this.xPos, this.yPos, this.width, this.height, cDir, allGameObjects[i].xPos, allGameObjects[i].yPos, allGameObjects[i].width, allGameObjects[i].height)){
                this.isColliding = true;
                allGameObjects[i].isColliding = true;
                allGameObjects[i].isCollidingWithMain = true;
                if (allGameObjects[i].name == "Gem"){
                    this.pickUpGem(i);
                }
            }
        }
    //return gemsCollected, allGameObjects;
    }
}