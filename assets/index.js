//Set global Variables
var GameMapSize //Value 1 Mobile 350x650, Value 2 Tablet 700x1000, Value 3 Desktop 900x1300
var Horizon = 0 //Mobile 200px, Tablet 300px, Desktop 400px

//Variables to determine screen size for background images
let verticalOffSet = 0
let horizontalOffSet = 0
let bottomOffSet = 0
let leftOffSet = 0
let heightOfSky = 0
let heightOfGrass = 0
let widthOfGrass = 0


//Find out browser width to set game map size.
function mapSize(screenWidth) {
    if (screenWidth>=900){
        //Map Size will be 900px by 1300px
        console.log(screenWidth)
        console.log("Set Game Map Size to 900x1300")
        GameMapSize = 3
        //Set Horizon height
        Horizon = 400
         //Check to ensure inner window width is as expected
        if (window.innerWidth > 900) {
            horizontalOffSet = (window.innerWidth-900)/2
        } else {
            horizontalOffSet = 0
        }
        //Check to ensure inner window height is as expected
        if (window.innerHeight > 1300) {
            verticalOffSet = (window.innerHeight-1300)/2
        } else {
            verticalOffSet = 0
        }
        //Set Variables for how big an area to tile for the game map
        heightOfSky = (window.innerHeight-Horizon)-(verticalOffSet*2)
        heightOfGrass = Horizon + 50 - (verticalOffSet*2)
        widthOfGrass = window.innerWidth - (horizontalOffSet*2)
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
        heightOfGrass = Horizon + 50 - (verticalOffSet*2)
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
        heightOfGrass = Horizon + 50 - (verticalOffSet*2)
        widthOfGrass = window.innerWidth - (horizontalOffSet*2)
    }
}

//Function for placing background images throughout the browser
function tile(ImgAssest, Xpos, Ypos, Zpos, width, height){
    for(let h = 0; h < height; h++){
        for(let w = 0; w < width; w++){
            newImage(ImgAssest, Xpos + w*100, Ypos + h*100, Zpos)
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

//Call background image function and pass in requested asset and desired location. (Assest Name, X Pos, Y Pos, Z Pos, Width, Height)
tile('./assets/img/sky50.svg', 0, horizon, 0, window.innerWidth/50, heightOfSky/50)
tile('./assets/img/grass50.svg', 0, 100, 0, window.innerWidth/50, Horizon/50)

window.onload = ()=> {
    mapSize(window.screen.availWidth)
};