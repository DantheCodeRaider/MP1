//Function to detect objects touching
function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    //Check x and y for overlap
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
        return false;
    }
    return true;
}

//Fuction for detecting collisions of things for objects other than the main character
function detectCollisions(gameObject){
    let obj1;
    let obj2;

    //Reset collision state of all objects
    for (let i = 0; i < gameObject.length; i++){
        gameObject[i].isColliding = false;
    }

    //Start checking for collisions
    for (let i = 0; i < gameObject.length; i++){
        obj1 = gameObject[i];
        for (let o = i + 1; o < gameObject.length; o++){
            obj2 = gameObject[o];
            // Compare object1 with object2
            if (rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)){
                obj1.isColliding = true;
                obj2.isColliding = true;
            }
        }
    }
    return gameObject
}

function pushObjects(object1, Object2){
    object1.push.apply(object1, Object2);
    return object1;
}

//Fuction to pick a random gem image after digging a boulder
function rollGem(gameObject,i){
    let x = Math.floor(Math.random() * 11);
    console.log ('Gem Roll ' + x)
    switch (x) {
        // Rock
        case 0:
            gameObject.name = "Rock"
            gameObject.ID = "rock"+i
            gameObject.cName = "Rock"
            gameObject.ImgAssest="assets/img/rock.png"
        // White Gem
        case 1:
            gameObject.name ="Gem"
            gameObject.ID = "gem"+i
            gameObject.cName = "gem"
            gameObject.ImgAssest="assets/img/gem1.png"
            
        break;
        // Blue Gem
        case 2:
            gameObject.name ="Gem"
            gameObject.ID = "gem"+i
            gameObject.cName = "gem"
            gameObject.ImgAssest="assets/img/gem2.png"
        break;
        // Green Gem
        case 3:
            gameObject.name ="Gem"
            gameObject.ID = "gem"+i
            gameObject.cName = "gem"
            gameObject.ImgAssest="assets/img/gem3.png"
        break;
        // Red Gem
        case 4:
            gameObject.name ="Gem"
            gameObject.ID = "gem"+i
            gameObject.cName = "gem"
            gameObject.ImgAssest="assets/img/gem4.png"
        break;
        // Orange Gem
        case 5:
            gameObject.name ="Gem"
            gameObject.ID = "gem"+i
            gameObject.cName = "gem"
            gameObject.ImgAssest="assets/img/gem5.png"
        break;
        // Yellow Gem
        case 6:
            gameObject.name ="Gem"
            gameObject.ID = "gem"+i
            gameObject.cName = "gem"
            gameObject.ImgAssest="assets/img/gem6.png"
        break;
        // Purple Gem
        case 7:
            gameObject.name ="Gem"
            gameObject.ID = "gem"+i
            gameObject.cName = "gem"
            gameObject.ImgAssest="assets/img/gem7.png"
        break;
        // Black Gem
        case 8:
            gameObject.name ="Gem"
            gameObject.ID = "gem"+i
            gameObject.cName = "gem"
            gameObject.ImgAssest="assets/img/gem8.png"
        break;
        // Rock
        case 9:
            gameObject.name ="Rock"
            gameObject.ID = "rock"+i
            gameObject.cName = "Rock"
            gameObject.ImgAssest="assets/img/rock.png"
        break;
        // Rock
        case 10:
            gameObject.name ="Rock"
            gameObject.ID = "rock"+i
            gameObject.cName = "Rock"
            gameObject.ImgAssest="assets/img/rock.png"
        break;
        default:
            return; //Quit when this doesn't handle the key event.
        }
    return gameObject;
}

//Function to fade in game objects, mostly for gems.
function fadeIn(gameObject) {
    let op = 0.1;  //Set Initial opacity
    let timer = setInterval(function () {
        if (op.toFixed(1) >= 1){
            //console.log('Reseting Timer ' + op.toFixed(1))
            clearInterval(timer);
        }
        gameObject.context.style.opacity = `${op.toFixed(1)}`; //`${op.toFixed(1)}`
        //document.body.append(this.context)
        //console.log(op)
        //console.log('Looping ' + op.toFixed(1));
        op += 0.1;
    }, 10);
}