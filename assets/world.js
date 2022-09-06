//Detect Screen Size, Set Game Size, and set Game Window
//Find out browser width to set game map size.
function mapSize(screenWidth, screenHieght) {
    if (screenWidth>=900){
        //Map Size will be 900px by 1200px
        GameMapSize = 3
        console.log("Screen Width " + screenWidth+ "| Screen Hieght " + screenHieght + "| Set Game Map Size to 900x1200" + "| Game Map " + GameMapSize)
        
        //Set Horizon height
        Horizon = setHorizon(screenHieght, 400)
        console.log('Horizon ' + Horizon)

        //Set Horizontal Off Set
        horizontalOffSet = setHorizontalOffSet(screenWidth)
   
        //Set Vertical Off Set
        verticalOffSet = setVerticalOffSet(screenHieght)

        //Set Variables for how big an area to tile for the game map
        heightOfSky = 400
        heightOfGrass = 800
        widthOfGrass = 900
        //console.log('HeightofSky '+ heightOfSky)
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

function createGameWorld(){
    //Generate a number of boulders (possible gems) based on the contant of 5 + game map size + game level
    if (GameMapSize == 3 || GameMapSize == 2){
        for (let i = 0; i < (10+GameMapSize+GameLevel); i++){
            let x = randomXnumber();
            let y = randomYnumber();
            daBoulders[i] = new GameObject("Boulder", "./assets/img/boulder100.svg", x, y, 50, 0, 0);
        }

        for (let i = 0; i < daBoulders.length; i++){
            daBoulders[i].drawObject();
        }
    } else {
        for (let i = 0; i < (10+GameMapSize+GameLevel); i++){
            let x = randomXnumber();
            let y = randomYnumber();
            daBoulders[i] = new GameObject("Boulder", "./assets/img/boulder50.svg", x, y, 50, 0, 0);
        }

        for (let i = 0; i < daBoulders.length; i++){
            daBoulders[i].drawObject();
        }
    }
}
