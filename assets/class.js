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
        let basePos = this //Backup of Main Char
        this.Xpos += Xpos //Update Xpos
        this.Ypos += Ypos //Update Ypos
        this.Zpos += Zpos //Update Zpos

        //Check for Collisions
        this.detectObjects(allGameObjects)
        if (this.isColliding==true){
            console.log('I hit something!')
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

    // Reset Character to static state when it is not moving
    stopChar(){
        this.context.src='assets/img/green-character/static.gif'
    }
    //Detect collisions When the Main Character Moves
    detectObjects(allGameObjects){

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
            if (rectIntersect(this.Xpos, this.Ypos, this.width, this.height, allGameObjects[i].Xpos, allGameObjects[i].Ypos, allGameObjects[i].width, allGameObjects[i].height)){
                this.isColliding = true;
                allGameObjects[i].isColliding = true;
                allGameObjects[i].isCollidingWithMain = true;
            }
        }
    return allGameObjects
    }
}