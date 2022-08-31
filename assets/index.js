//Set global Variables
var GameMapSize //Value 1 Mobile 350x650, Value 2 Tablet 700x1000, Value 3 Desktop 900x1300, 

//Find out browser width to set game map size.
function mapSize(screenWidth) {
    if (screenWidth>=900){
        console.log(screenWidth)
        console.log("Set Game Map Size to 900x1300")
        GameMapSize = 3

    }else if (screenWidth>=700){
        console.log(screenWidth)
        console.log("Set Game Map Size to 700x1000")
        GameMapSize = 2
    }

    else {
        console.log(screenWidth)
        console.log("Set Game Map Size to 350x650")
        GameMapSize = 1
    }
}

window.onload = ()=> {
    mapSize(window.screen.availWidth)
};