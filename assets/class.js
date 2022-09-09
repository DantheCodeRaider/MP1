//Establish classes
class GameObject{
    constructor(name, context, ImgAssest, Xpos, Ypos, Zpos, VelX, VelY, state){
        this.name = name //Object name type
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
    drawObject (ImgAssest, Xpos, Ypos, Zpos) {
        this.context = document.createElement('img')
        this.context.src = this.ImgAssest
        this.context.style.position = 'fixed'
        this.context.style.left = this.Xpos +'px'
        this.context.style.bottom = this.Ypos +'px'
        this.context.style.zIndex = this.Zpos
        //this.context.style.border = 'solid 3px white'
        document.body.append(this.context)
    }
}

class Character extends GameObject {
    constructor(name, context, ImgAssest, Xpos, Ypos, Zpos, velX, VelY){
        super(name, context, ImgAssest, Xpos, Ypos, Zpos, velX, VelY);

        //Set default hieght and width
        this.width = 50;
        this.height = 50;
        this.state = 1; //Neutral
    }
}

class NPC extends Character {
    constructor(name, context, ImgAssest, Xpos, Ypos, Zpos, velX, VelY){
        super(name, context, ImgAssest, Xpos, Ypos, Zpos, velX, VelY);

        //Set NPC Specific settings
        this.ImgAssest = "assets/img/red-character/static.gif"
        this.state = 3; //Hostile
    }
    update(){
        
    }
}

class mainCharacter extends Character {
    constructor(name, context, ImgAssest, Xpos, Ypos, Zpos, velX, VelY){
        super(name, context, ImgAssest, Xpos, Ypos, Zpos, velX, VelY);
        
        //Set defaults
        this.state = 2; //Friendly
    }
    
    //Function for moving mainCharacter around in the game
    moveChar(Xpos, Ypos, Zpos, cDir){
        this.Xpos += Xpos //Update Xpos
        this.Ypos += Ypos //Update Ypos
        this.Zpos += Zpos //Update Zpos

        //Check for Collisions
        this.detectObjects(allGameObjects, cDir)
        if (this.isColliding==true){
            console.log('I hit something!')
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
        console.log('|'+ this.Xpos +' Xpos |'+ this.Ypos + ' Ypos' + ' | ' + this.Zpos + ' Zpos');
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
                let y1 = this.Xpos
                let y2 = this.Ypos
                let x2 = daBoulders[i].Xpos
                let y2 = daBoulders[i].Ypos
                //find the distance between the main character a boulder
                let d = Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2))
                console.log('Distance to boulder is ' + d)
                if (d <= 100){
                    console.log('I found a boulder to hit at ' + daBoulders[i].Xpos + ' ' + daBoulders[i].Ypos)
                }
            }

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
                this.Xpos
                this.Ypos=y2-h1 
                console.log('Impact heading North '+ this.Xpos +' '+ this.Ypos)
            break;
            // Update character position for moving South
            case "South":
                this.Xpos
                this.Ypos=y2+h2 
                console.log('Impact heading South '+ this.Xpos +' '+ this.Ypos) 
            break;
            // Update character position for moving East
            case "East":
                this.Xpos=x2-w1
                this.Ypos
                console.log('Impact heading East '+ this.Xpos +' '+ this.Ypos)
            break;
            // Update character position for moving West
            case "West":
                this.Xpos=x2+w2
                this.Ypos
                console.log('Impact heading West '+ this.Xpos +' '+ this.Ypos)
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