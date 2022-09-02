//Set global Variables
var GameMapSize //Value 1 Mobile 350x650, Value 2 Tablet 700x1000, Value 3 Desktop 900x1300
var Horizon = 0 //Mobile 200px, Tablet 300px, Desktop 400px

//Variables to determine screen size for background images
let verticalOffSet = 0
let horizontalOffSet = 0
let heightOfSky = 0
let heightOfGrass = 0
let widthOfGrass = 0


//Find out browser width to set game map size.
function mapSize(screenWidth, screenHieght) {
    if (screenWidth>=900){
        //Map Size will be 900px by 1300px
        console.log("Screen Width " + screenWidth+ " Screen Hieght " + screenHieght + " Set Game Map Size to 900x1300")
        GameMapSize = 3
        //Set Horizon height
        Horizon = setHorizon(screenHieght, 400)
        console.log('Horizon ' + Horizon)

         //Check to ensure window width is as expected
        if (screenWidth > 900) {
            horizontalOffSet = (screenWidth-900)/2
        } else {
            horizontalOffSet = 0
        }
        //Check to ensure window height is as expected
        if (screenHieght > 1300) {
            verticalOffSet = (screenHieght-1300)/2
        } else {
            verticalOffSet = 0
        }
        //Set Variables for how big an area to tile for the game map
        heightOfSky = 400
        heightOfGrass = 900
        widthOfGrass = 900
        //console.log('HeightofSky '+ heightOfSky)
    } else if (screenWidth>=700){
        //Map Size will be 700px by 1000px
        console.log(screenWidth)
        console.log("Set Game Map Size to 700x1000")
        GameMapSize = 2
        //Set Horizon height
        Horizon = 300
        //Check to ensure inner window width is as expected
        if (window.innerWidth > 700) {
            horizontalOffSet = (window.innerWidth-700)/2
        } else {
            horizontalOffSet = 0
        }
        //Check to ensure inner window height is as expected
        if (window.innerHeight > 1000) {
            verticalOffSet = (window.innerHeight-1000)/2
        } else {
            verticalOffSet = 0
        }
        //Set Variables for how big an area to tile for the game map
        heightOfSky = (window.innerHeight-Horizon)-(verticalOffSet*2)
        heightOfGrass = Horizon + 50
        widthOfGrass = window.innerWidth - (horizontalOffSet*2)
    } else {
        //Map Size will be 350px by 650px
        console.log(screenWidth)
        console.log("Set Game Map Size to 350x650")
        GameMapSize = 1
        //Set Horizon height
        Horizon = 200
        //Check to ensure inner window width is as expected
        if (window.innerWidth > 350) {
            horizontalOffSet = (window.innerWidth-350)/2
        } else {
            horizontalOffSet = 0
        }
        //Check to ensure inner window height is as expected
        if (window.innerHeight > 650) {
            verticalOffSet = (window.innerHeight-650)/2
        } else {
            verticalOffSet = 0
        }
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

//Function for placing background images throughout the browser
function tile(ImgAssest, Xpos, Ypos, Zpos, width, height){
    for(let h = 0; h < height; h++){
        for(let w = 0; w < width; w++){
            newImage(ImgAssest, Xpos + w*100, Ypos + h*100, Zpos)
        }
    }
}

//Function for placing background images throughout the browser
function tileBackground(ImgAssest, Xpos, Ypos, Zpos, width, height, hOffSet, vOffSet){
    let vOS = (vOffSet*2)/50
    let hOS = (hOffSet*2)/50
   /*  let h=0
    let w=0
    newImage(ImgAssest, Xpos + w*40, Ypos + h*40, Zpos) */
/*     for(let h = 0; h < height; h++){
        for(let w = 0; w < width; w++){
            newImage(ImgAssest, Xpos + w*40, Ypos + h*40, Zpos)
            //console.log(Xpos +' '+ w*50 +' '+ Ypos +' '+ h*50 +' '+ Zpos)
        }
    } */
    for(let h = 0; h < height; h++){
        for(let w = 0; w < width; w++){
            //newImage(ImgAssest, Xpos + w*50, Ypos + h*50, Zpos)
            //console.log(Xpos +' '+ w*50 +' '+ Ypos +' '+ h*50 +' '+ Zpos)
            
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

/* //Function for placing offset background images throughout the browser
function tileOffSet(ImgAssest, Xpos, Ypos, Zpos, width, height, hOffSet, vOffSet){
    for(let h = 0; h < height; h++){
        for(let w = 0; w < width; w++){
            newImage(ImgAssest, Xpos + w*100, Ypos + h*100, Zpos)
            //console.log(Xpos +' '+ w*50 +' '+ Ypos +' '+ h*50 +' '+ Zpos)
            
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
} */

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

function gameWindow(Xpos, Ypos, Zpos, width, height, hOffSet, vOffSet){
    let mDiv = document.querySelector('main')
    let nDiv= document.createElement('Div')
    nDiv.className = 'gameWindow'
    nDiv.style.position = 'fixed'
    nDiv.style.top = vOffSet +'px'
    nDiv.style.width = width+"px"
    nDiv.style.height = height+"px"
    nDiv.style.Zpos = Zpos
    nDiv.style.border = "solid 5px Black"
    nDiv.style.textAlign = "Center"
    nDiv.style.justifyContent = "Center"
    nDiv.style.margin = "Auto"
    mDiv.append(nDiv)
}

window.onload = ()=> {
    mapSize(window.screen.availWidth, window.screen.availHeight)
    //Call background image function and pass in requested asset and desired location. (Assest Name, X Pos, Y Pos, Z Pos, Width, Height)
    //console.log('Sky Height ' + heightOfSky)
    //console.log('Grass Height ' + heightOfGrass)
    //console.log('Width ' + widthOfGrass)
    console.log('widthOfGrass/50 ' + widthOfGrass/50 + ' heightOfGrass/50 ' + heightOfGrass/50+ ' horizontalOffSet '+ horizontalOffSet + ' verticalOffSet '+ verticalOffSet )
    console.log('heightOfGrass/50 ' + heightOfGrass/50)
    //tileOffSet('./assets/img/offset50.svg', 0, 0, 0, widthOfGrass, heightOfSky/50, horizontalOffSet, verticalOffSet)
    tileBackground('./assets/img/sky100.svg', horizontalOffSet, Horizon-verticalOffSet, 1, widthOfGrass/50, heightOfSky/50, horizontalOffSet, verticalOffSet)
    tileBackground('./assets/img/grass100.svg', horizontalOffSet, verticalOffSet, 1, widthOfGrass/50, heightOfGrass/50, horizontalOffSet, verticalOffSet)
    gameWindow(horizontalOffSet, verticalOffSet, 2, widthOfGrass, heightOfGrass+heightOfSky, horizontalOffSet, verticalOffSet)
};

