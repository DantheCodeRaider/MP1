//Establish classes
class GameObject{
    constructor(name, ID, cName, context, ImgAssest, Xpos, Ypos, Zpos, VelX, VelY, state){
        this.name = name //Object name type
        this.ID = ID //Object ID
        this.cName = cName //Object Class
        this.context = context //Used to update browser
        this.ImgAssest = ImgAssest //Used for art assets links
        this.Xpos = Xpos //X Position
        this.Ypos = Ypos //Y Position
        this.Zpos = Zpos //Z Position
        this.VelX = VelX //X Velocity
        this.VelY = VelY //Y Velocity
        this.state = state //0 Hidden, 1 Neutral, 2 Friendly, 3 Hostile

        this.isColliding = false; //Is Colliding (true/false)
        this.isCollidingWithMain = false; //Is Colliding with Main Character (true/false)
    }
    //Function for placing objects throughout the browser
    drawObject () {
        this.context = document.createElement('img')
        this.context.className = this.cName
        this.context.id = this.ID
        this.context.src = this.ImgAssest
        this.context.style.position = 'fixed'
        this.context.style.left = this.Xpos +'px'
        this.context.style.bottom = this.Ypos +'px'
        this.context.style.zIndex = this.Zpos
        //this.context.style.border = 'solid 3px white'
        document.body.append(this.context)
    }
    //Function for replacing objects throughout the browser
    updateObject (oldObject) {
        this.context = document.getElementById(oldObject.ID)
        this.context.className = this.cName
        this.context.id = this.ID
        this.context.src = this.ImgAssest
        this.context.style.position = 'fixed'
        this.context.style.left = this.Xpos +'px'
        this.context.style.bottom = this.Ypos +'px'
        this.context.style.zIndex = this.Zpos
        context.style.visibility = "show"
        //this.context.style.border = 'solid 3px white'
        document.body.append(this.context)
    }
}

class Character extends GameObject {
    constructor(name, ID, cName, context, ImgAssest, Xpos, Ypos, Zpos, velX, VelY){
        super(name, ID, cName, context, ImgAssest, Xpos, Ypos, Zpos, velX, VelY);

        //Set default hieght and width
        this.width = 50;
        this.height = 50;
        this.state = 1; //Neutral
    }
}

class NPC extends Character {
    constructor(name, ID, cName, context, ImgAssest, Xpos, Ypos, Zpos, velX, VelY){
        super(name, ID, cName, context, ImgAssest, Xpos, Ypos, Zpos, velX, VelY);

        //Set NPC Specific settings
        this.ImgAssest = "assets/img/red-character/static.gif"
        this.state = 3; //Hostile
    }
    update(){
        
    }
}

class mainCharacter extends Character {
    constructor(name, ID, cName, context, ImgAssest, Xpos, Ypos, Zpos, velX, VelY){
        super(name, ID, cName, context, ImgAssest, Xpos, Ypos, Zpos, velX, VelY);
        
        //Set defaults
        this.state = 2; //Friendly
    }
    
    //Function for moving mainCharacter around in the game
    moveChar(Xpos, Ypos, Zpos, cDir){
        let preImpact = this
        console.log('Starting |'+ preImpact.Xpos +' Xpos |'+ preImpact.Ypos + ' Ypos' + ' | ' + preImpact.Zpos + ' Zpos'); 
        this.Xpos += Xpos //Update Xpos
        this.Ypos += Ypos //Update Ypos
        this.Zpos += Zpos //Update Zpos

        //Check for Collisions
        this.detectObjects(allGameObjects, cDir)
        if (this.isColliding==true){
            //console.log('I hit something!')
            //his.Xpos -= Xpos //Update Xpos
            //this.Ypos -= Ypos //Update Ypos
        }

        //Keep Character on the map West/East
        if (this.Xpos < horizontalOffSet) {
            this.Xpos = horizontalOffSet
        } else if (this.Xpos >= (widthOfGrass+horizontalOffSet)) {
            this.Xpos = (widthOfGrass+horizontalOffSet) - 50
        }
        //Keep Character on the map North/South
        if (this.Ypos < verticalOffSet) {
            this.Ypos = verticalOffSet
        } else if (this.Ypos > (heightOfGrass+verticalOffSet)-50) {
            this.Ypos = (heightOfGrass+verticalOffSet)-50
        }
        //Console Logs for bug testing
        console.log('Ending |'+ this.Xpos +' Xpos |'+ this.Ypos + ' Ypos' + ' | ' + this.Zpos + ' Zpos');
        this.context.style.left = this.Xpos+'px';
        this.context.style.bottom = this.Ypos +'px';
        this.context.style.Zpos = this.Zpos
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
    }

    //Reset Character to static state when it is not moving
    stopChar(){
        this.context.src='assets/img/green-character/static.gif'
    }
    
    //Check for boulder near by and dig for gems
    dig(daBoulders, daGems){
        //Loop through boulders to see if they are close
        for (let i = 0; i < daBoulders.length; i++){
            //Check to make sure we are looping through only Boulder objects
            if (daBoulders[i].name == "Boulder"){
                let x1 = this.Xpos
                let y1 = this.Ypos
                let x2 = daBoulders[i].Xpos
                let y2 = daBoulders[i].Ypos
                //find the distance between the main character a boulder
                let d = Math.floor(Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2)))
                console.log('Distance to boulder is ' + d)
                if (d < 110){
                    let oldObject
                    daGems = new GameObject('', "gem"+i, '', '', daBoulders[i].Xpos, daBoulders[i].Ypos, 50, 0, 0, 1);
                    rollGem(daGems)
                    console.log('I found a boulder to hit at ' + daBoulders[i].Xpos + ' ' + daBoulders[i].Ypos)
                    daBoulders[i].context.style.visibility = "hidden"
                    oldObject = daBoulders[i] 
                    daBoulders[i] = daGems
                    daBoulders[i].updateObject(oldObject)

                    //allGameObjects.append(daGems)
                    //allGameObjects.append(daBoulders)
                }
            }
        }
        return daBoulders, daGems;
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
                    this.Xpos
                    this.Ypos=y2-h1 
                    console.log('Impacted the bottom of an Object while heading North '+ this.Xpos +' '+ this.Ypos)
                } else if (x1+w1 <= x2){
                    //Impacted the left side of an Object
                    this.Xpos=x2-w1
                    this.Ypos 
                    console.log('Impacted the left side of an Object while heading North '+ this.Xpos +' '+ this.Ypos)
                } else if (x1 <= x2+w2) {
                    //Impacted the right side of an Object
                    this.Xpos=x2+w2
                    this.Ypos 
                    console.log('Impacted the right side of an Object while heading North '+ this.Xpos +' '+ this.Ypos)
                } else {
                    console.log('Unexpected impact at '+ x1 +' '+ y1)
                }
            break;
            // Update character position for moving South
            case "South":
                if (y1+h1 >= y2+h2 & x1 < x2+w2 & x1+w1 > x2){
                    this.Xpos
                    this.Ypos=y2+h2 
                    console.log('Impacted the top of an Object while heading South '+ this.Xpos +' '+ this.Ypos)  
                } else if (x1+w1 <= x2){
                    //Impacted the left side of an Object
                    this.Xpos=x2-w1
                    this.Ypos 
                    console.log('Impacted the left side of an Object while heading South '+ this.Xpos +' '+ this.Ypos)
                } else if (x1 >= x2+w2) {
                    //Impacted the right side of an Object
                    this.Xpos=x2+w2
                    this.Ypos 
                    console.log('Impacted the right side of an Object while heading South '+ this.Xpos +' '+ this.Ypos)
                } else {
                    console.log('Unexpected impact at '+ x1 +' '+ y1)
                }
            break;
            // Update character position for moving East
            case "East":
                if (x1 <= x2+w2 & y1 < y2+h2 & y1+h1 > y2){ 
                    //Impacted the left side of an Object
                    this.Xpos=x2-w1
                    this.Ypos
                    console.log('Impacted the left side of an Object while heading East '+ this.Xpos +' '+ this.Ypos)
                } else if (y1 < y2){ 
                    //Impacted the bottom of an Object
                    this.Xpos
                    this.Ypos=y2-h1
                    console.log('Impacted the bottom of an Object while heading East '+ this.Xpos +' '+ this.Ypos)
                } else if (y1+h1 > y2) {
                    //Impacted the top of an Object
                    this.Xpos
                    this.Ypos=y2+h2 
                    console.log('Impacted the top side of an Object while heading East '+ this.Xpos +' '+ this.Ypos)
                } else {
                        console.log('Unexpected impact at '+ x1 +' '+ y1)
                }
            break;
            // Update character position for moving West
            case "West":
                if (x1+w1 >= x2+w2 & y1 < y2+h2 & y1+h1 > y2){ 
                    //Impacted the left side of an Object
                    this.Xpos=x2+w2
                    this.Ypos
                    console.log('Impacted the right side of an Object while heading West '+ this.Xpos +' '+ this.Ypos)
                } else if (y1 < y2){ 
                    //Impacted the bottom of an Object
                    this.Xpos
                    this.Ypos=y2-h1
                    console.log('Impacted the bottom of an Object while heading West '+ this.Xpos +' '+ this.Ypos)
                } else if (y1+h1 > y2) {
                    //Impacted the top of an Object
                    this.Xpos
                    this.Ypos=y2+h2 
                    console.log('Impacted the top side of an Object while heading West '+ this.Xpos +' '+ this.Ypos)
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
    detectObjects(allGameObjects, cDir){

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
            if (this.impactPoint(this.Xpos, this.Ypos, this.width, this.height, cDir, allGameObjects[i].Xpos, allGameObjects[i].Ypos, allGameObjects[i].width, allGameObjects[i].height)){
                this.isColliding = true;
                allGameObjects[i].isColliding = true;
                allGameObjects[i].isCollidingWithMain = true;
            }
        }
    return allGameObjects
    }
}