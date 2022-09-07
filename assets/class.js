//Establish classes
class GameObject{
    constructor(context, ImgAssest, Xpos, Ypos, Zpos, velX, VelY){
        this.context = context
        this.ImgAssest = ImgAssest
        this.Xpos = Xpos
        this.Ypos = Ypos
        this.Zpos = Zpos

        this.isColliding = false;
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
    constructor(context, ImgAssest, Xpos, Ypos, Zpos, velX, VelY){
        super(context, ImgAssest, Xpos, Ypos, Zpos, velX, VelY);

        //Set NPC Specific settings
        this.ImgAssest = "assets/img/red-character/static.gif"
    }
    update(){
        
    }
}

class mainCharacter extends Character {
    constructor(context, ImgAssest, Xpos, Ypos, Zpos, velX, VelY){
        super(context, ImgAssest, Xpos, Ypos, Zpos);
    }
    //Function for moving mainCharacter around in the game
     moveChar(Xpos, Ypos, Zpos, cDir){
        this.Xpos += Xpos //Update Xpos
        this.Ypos += Ypos //Update Ypos
        this.Zpos += Zpos //Update Zpos
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
        //console.log('|'+ charCoords[0]+' Xpos |'+ charCoords[1] + ' Ypos' + ' | ' + charCoords[2]+ ' Zpos');
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
}