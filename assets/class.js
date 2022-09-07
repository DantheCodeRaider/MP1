//Establish classes
class GameObject{
    constructor(context, ImgAssest, Xpos, Ypos, Zpos, VelX, VelY, state){
        this.context = context //Used to update browser
        this.ImgAssest = ImgAssest //Used for art assets links
        this.Xpos = Xpos //X Position
        this.Ypos = Ypos //Y Position
        this.Zpos = Zpos //Z Position
        this.VelX = VelX //X Velocity
        this.VelY = VelY //Y Velocity
        this.state = state //0 Hidden, 1 Nueteral, 2 Friendly, 3 Hostile

        this.isColliding = false; //Is Colliding
        this.isCollidingWithMain = false; //Is Colliding with Main Character
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
    constructor(context, ImgAssest, Xpos, Ypos, Zpos, velX, VelY){
        super(context, ImgAssest, Xpos, Ypos, Zpos, velX, VelY);

        //Set default hieght and width
        this.width = 50;
        this.height = 50;
    }
}

class NPC extends Character {
    constructor(context, ImgAssest, Xpos, Ypos, Zpos, VelX, VelY, state){
        super(context, ImgAssest, Xpos, Ypos, Zpos, VelX, VelY, state);

        //Set NPC Specific settings
        this.ImgAssest = "assets/img/red-character/static.gif"
    }
    update(){
        
    }
}

class mainCharacter extends Character {
    constructor(context, ImgAssest, Xpos, Ypos, Zpos, VelX, VelY, state){
        super(context, ImgAssest, Xpos, Ypos, Zpos, VelX, VelY, state);
    }
    //Function for moving mainCharacter around in the game
     moveChar(Xpos, Ypos, Zpos, cDir){
        let basePos = this //Backup of Main Char
        this.Xpos += Xpos //Update Xpos
        this.Ypos += Ypos //Update Ypos
        this.Zpos += Zpos //Update Zpos

        //Check for Collisions
        this.detectObjects(GameObject)
        if (this.isColliding==true){

        } else {

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
        console.log('|'+ charCoords[0]+' Xpos |'+ charCoords[1] + ' Ypos' + ' | ' + charCoords[2]+ ' Zpos');
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
        document.body.append(this.context)
    }
    detectObjects(gameObject){
        let obj1;
        let obj2;
        
        //Reset collision state of all objects
        for (let i = 0; i < gameObject.length; i++){
            gameObject[i].isColliding = false;
            gameObject[i].isCollidingWithMain = false;
        }
        //Set Obj 1 as Main Character
        this.isColliding = false;
        
        //Start checking for collisions
        for (let i = 0; i < gameObject.length; i++){
        obj2 = gameObject[i];
            // Compare object1 with object2
            if (rectIntersect(this.Xpos, this.Ypos, this.width, this.height, gameObject[i].Xpos, gameObject[i].Ypos, gameObject[i].width, gameObject[i].height)){
                this.isColliding = true;
                gameObject[i].isColliding = true;
                gameObject[i].isCollidingWithMain = true;
            }
        }
    return gameObject
    }
}