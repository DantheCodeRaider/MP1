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
        GameMapSize = 3
        console.log("Screen Width " + screenWidth+ "| Screen Hieght " + screenHieght + "| Set Game Map Size to 900x1300" + "| Game Map " + GameMapSize)
        
        //Set Horizon height
        Horizon = setHorizon(screenHieght, 400)
        console.log('Horizon ' + Horizon)

        //Set Horizontal Off Set
        horizontalOffSet = setHorizontalOffSet(screenWidth)
   
        //Set Vertical Off Set
        verticalOffSet = setVerticalOffSet(screenHieght)

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

        //Set HorizontalOffSet
        horizontalOffSet = setVerticalOffSet(screenWidth)

        //Set Vertical Off Set
        verticalOffSet = setVerticalOffSet(screenHieght)

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
    if (screenHieght > 1300 && GameMapSize == 3) {
        vOS = (screenHieght-1300)/2
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
function tile(ImgAssest, Xpos, Ypos, Zpos, width, height){
    for(let h = 0; h < height; h++){
        for(let w = 0; w < width; w++){
            newImage(ImgAssest, Xpos + w*100, Ypos + h*100, Zpos)
        }
    }
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
    nImg.style.zIndex = Zpos
    document.body.append(nImg)
    return nImg
}

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

window.onload = ()=> {
    mapSize(window.screen.availWidth, window.screen.availHeight)
    //Call background image function and pass in requested asset and desired location. (Assest Name, X Pos, Y Pos, Z Pos, Width, Height)
    //console.log('Sky Height ' + heightOfSky)
    //console.log('Grass Height ' + heightOfGrass)
    //console.log('Width ' + widthOfGrass)
    //console.log('widthOfGrass/50 ' + widthOfGrass/50 + ' heightOfGrass/50 ' + heightOfGrass/50+ ' horizontalOffSet '+ horizontalOffSet + ' verticalOffSet '+ verticalOffSet )
    //console.log('heightOfGrass/50 ' + heightOfGrass/50)
   tileBackground('./assets/img/offset100.svg', -50, -50, 0, window.screen.availWidth/50, window.screen.availHeight/50, horizontalOffSet, verticalOffSet)
    tileBackground('./assets/img/grass100.svg', horizontalOffSet-50, verticalOffSet-50, 1, widthOfGrass/50, heightOfGrass/50, horizontalOffSet, verticalOffSet)
    tileBackground('./assets/img/sky100.svg', horizontalOffSet-50, Horizon-verticalOffSet-50, 5, widthOfGrass/50, heightOfSky/50, horizontalOffSet, verticalOffSet)
    gameWindow(horizontalOffSet, verticalOffSet, 10, widthOfGrass, heightOfGrass+heightOfSky, horizontalOffSet, verticalOffSet)

};

