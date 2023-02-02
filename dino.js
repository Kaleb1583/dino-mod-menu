//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
console.clear();

try { 
    deleteElementsById("version") // delete old version element variables
} catch(err) {
    console.log(err)
}
createElementVariable("version", "V2")

try {
    deleteElementsById("myNav")
    Runner.instance_.horizon.obstacleHistory = [];
} catch(err) {
    console.log(err)
}

document.title = "Dino Game";
//document.getElementById("main-message").children[0].children[0].innerHTML = "Press Space To Play!";

function freezeDino() {
    Runner.instance_.playingIntro = true;
}

function maxSpeed() {
    Runner.config.ACCELERATION = 999999;
    Runner.config.SPEED = 9999;
    Runner.config.MAX_SPEED = 99999;
    console.log("Acceleration: " + Runner.config.ACCELERATION)
    console.log("Acceleration: " + Runner.config.SPEED)
}

function setGravity() {
    gravityInput = document.getElementById("gravityInput").value;
    Runner.instance_.tRex.config.GRAVITY = gravityInput;
    // (normal is 0.6)
}

function removeObstacles() {
    Runner.defaultDimensions.WIDTH = 9999999;
    Runner.defaultDimensions.HEIGHT = 999999;
    console.log("removed all obstacles.")
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function removeObstaclesOnVision() {
    Runner.instance_.horizon.reset();
    setTimeout(function() {
        removeObstaclesOnVision();
    }, 500);
}

function validate(evt) {
    var theEvent = evt || window.event;
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault)
            theEvent.preventDefault();
    }
}

function setDistance() {
    var input = document.getElementById("distanceInput").value;
    var distance = 41.6343779986 * input;
    Runner.instance_.distanceRan = distance;
    // 41.6343779986 * 2 will show as 000002
    document.getElementById("distanceInput").value = "Set!";
    button = document.getElementById("distanceSetButton");
    button.disabled = true;
    document.getElementById("distanceInput").value = input;
    button.disabled = false;

}
function speedMenu() {
    MenuItemsVisibility(1, "hide")
    document.getElementById("myNav").style.width = "165%";
    createMenuItemSubMenu(2, "<a onclick='hideSpeedMenu()'>(Back)</a>")
    createMenuItemSubMenu(2, "<a id='subMenu'>Acceleration </a><input id='AccelerationInput'></input><button id='speedsubmenubutton' style='margin-right: 73%;' onclick='setAcceleration()'>Set</button><br>", "changeSpeed")
    createMenuItemSubMenu(2, "<a id='subMenu'>Speed </a><input  id='SpeedInput'></input><button id='speedsubmenubutton'  style='margin-right: 73%;' onclick='setSpeed()'>Set</button><br>", "changeSpeed")
    createMenuItemSubMenu(2, "<a id='subMenu'>Max Speed </a><input  id='MaxSpeedInput'></input><button id='speedsubmenubutton' style='margin-right: 73%;' onclick='setMaxSpeed()'>Set</button><br>", "changeSpeed")
    createMenuItemSubMenu(2, "<a>-------------------------------</a>")
    createMenuItemSubMenu(2, "<a onclick='maxSpeed()'>Max Speed (^^^ max out all ^^^)</a>")
    createMenuItemSubMenu(2, "<a>-------------------------------</a>")
    createMenuItemSubMenu(2, "<a onclick='increaseSpeedOverTime();'>Increase Speed By 0.1 Every Sec (makes it a tab bit harder further on)</a>")
    createMenuItemSubMenu(2, "<a>(^ and it resets every death ^)</a>")
    console.log("hid other items and created speed menu")
}
function increaseSpeedOverTime() {
    Runner.instance_.currentSpeed = Runner.instance_.currentSpeed + 0.1;
    setTimeout(function() {
        increaseSpeedOverTime();
    }, 1000);
}
function changeMenuItemOrder(MenuItemMoving, MenuItemAbove) {
    // it will put MenuItemMoving below MenuItemAbove
    // example if your moving item 2 you would make the menu item above = 1
    document.getElementById("myNav").style.width = "45%";
    var MenuItemsCount = getElementVariableValue("MenuItemsCount");
    var MenuItemMoving = document.getElementById("MenuNumber"+MenuItemMoving);
    var MenuItemAbove = document.getElementById("MenuNumber"+MenuItemAbove);
    MenuItemAbove.after(MenuItemMoving);
}
function hideSpeedMenu() {
    /*
    deleteElementsById("subMenu")

    deleteElementsById("AccelerationInput")
    deleteElementsById("SpeedInput")
    deleteElementsById("MaxSpeedInput")
    deleteElementsById("speedsubmenubutton")
    deleteElementsById("MenuItemSubItem")
    document.getElementById("changeSpeed").hidden = false;
    */
    document.getElementById("MenuNumber2").remove();
    createMenuItem(2, "<a id='changeSpeed' onclick='speedMenu()'>Change Speed</a>");
    changeMenuItemOrder(2, 1) // the old menunumber2 was deleted and a new menunumber2 was created but put at the bottom of the menu instead of slot 2 so this puts it back in place where its suppose to be
    MenuItemsVisibility("", "show")

}
function dimensionsMenu() {
    MenuItemsVisibility(14, "hide")
    // (14 = menu number 15) 0 1 2 3 ...
    createMenuItemSubMenu(15, "<a onclick='hidedimensionsMenu()'>(Back)</a>")
    createMenuItemSubMenu(15, "<a id='subMenu'>Width </a><input id='WidthInput'></input><button id='dimensionssubmenubutton' style='margin-right: 73%;' onclick='setWidth()'>Set</button><br>", "changeDimensions")
    createMenuItemSubMenu(15, "<a id='subMenu'>Height </a><input  id='HeightInput'></input><button id='dimensionssubmenubutton'  style='margin-right: 73%;' onclick='setHeight()'>Set</button><br>", "changeDimensions")
    createMenuItemSubMenu(15, "<button onclick='resetDimensions();'>Reset Width/Height Dimensions</button>")
    canvas = document.getElementsByClassName("runner-canvas");
}
function hidedimensionsMenu() {
    //document.getElementById("changeSpeed").hidden = false;
    deleteElementsById("subMenu")
    deleteElementsById("WidthInput")
    deleteElementsById("HeightInput")
    deleteElementsById("dimensionssubmenubutton")
    deleteElementsById("MenuItemSubItem")
    document.getElementById("changeDimensions").hidden = false;

    MenuItemsVisibility("", "show")

}
function setWidth() {
    widthInput = document.getElementById("WidthInput").value;
    document.getElementsByClassName("runner-container")[0].style.width = widthInput + "px";
}
function setHeight() {
    heightInput = document.getElementById("HeightInput").value;
    document.getElementsByClassName("runner-canvas")[0].style.height = heightInput + "px";
}
function resetDimensions() {
}
function setAcceleration() {
    var AccelerationInput = document.getElementById("AccelerationInput").value;
    console.log(Runner.config.ACCELERATION + " got set to: " + AccelerationInput)
    Runner.config.ACCELERATION = AccelerationInput;
}
function setSpeed() {
    var speedInput = document.getElementById("SpeedInput").value;
    console.log(Runner.config.SPEED + " got set to: " + speedInput)
    Runner.config.SPEED = speedInput;
}

function setJumpVelocity() {
    var input = document.getElementById("velocityInput").value;
    console.log(Runner.instance_.tRex.setJumpVelocity + " got set to: " + AccelerationInput)
    Runner.instance_.tRex.setJumpVelocity(input);
}

function setGravityToNone() {
    var input = document.getElementById("velocityInput").value;
    Runner.instance_.tRex.setJumpVelocity(NaN);
}

function beinvisible() {
    // this sets your height to 0 making you invisible but not invincible!!
    Runner.instance_.tRex.config.HEIGHT = 0;
}

function darkBackground() {
    Runner.prototype.invert();
}
// this lazer function was not my idea and not my creation btw i only added red color to the lines
function lazers() {
    b = Runner.instance_.clearCanvas;
    window.addEventListener("keydown", checkKeyPressed, false);
    function checkKeyPressed(l) {
        if (l.keyCode == "68") {
            drawline()
        }
    }
    function drawline() {
        if (Runner.instance_.horizon.obstacles.length > 0) {
            Runner.instance_.clearCanvas = function() {}
            ;
            Runner.instance_.canvasCtx.strokeStyle = '#ff0000';
            // i added this one line which makes it red lazers
            Runner.instance_.canvasCtx.beginPath();
            Runner.instance_.canvasCtx.moveTo(Runner.instance_.tRex.xPos + 23, Runner.instance_.tRex.yPos + 20);
            Runner.instance_.canvasCtx.lineTo(Runner.instance_.horizon.obstacles[0].xPos + 10, Runner.instance_.horizon.obstacles[0].yPos + 10);
            Runner.instance_.canvasCtx.stroke();
            setTimeout(function() {
                Runner.instance_.clearCanvas = b;
            }, 15);
            Runner.instance_.horizon.removeFirstObstacle();
        }
    }
}

//var RealGameOver = Runner.prototype.gameOver;

function GodModeToggle() {
    Runner.prototype.gameOver = function() {};
    console.log("Godmode Activated!")
}

function breakGraphics() {
    Runner.instance_.dimensions.WIDTH = 123
}

function removeBottomLine() {
    Runner.spriteDefinition.LINES[0].HEIGHT = 1232132;
}
createElementVariable("autoPlay", "false")
function autoPlay() {
    eval(`
  function keyDown(e) {
    Podium = {};
    var n = document.createEvent("KeyboardEvent");
    Object.defineProperty(n, "keyCode", {
        get: function () {
            return this.keyCodeVal;
        },
    }),
        n.initKeyboardEvent ? n.initKeyboardEvent("keydown", !0, !0, document.defaultView, e, e, "", "", !1, "") : n.initKeyEvent("keydown", !0, !0, document.defaultView, !1, !1, !1, !1, e, 0),
        (n.keyCodeVal = e),
        document.body.dispatchEvent(n);
}
function keyUp(e) {
    Podium = {};
    var n = document.createEvent("KeyboardEvent");
    Object.defineProperty(n, "keyCode", {
        get: function () {
            return this.keyCodeVal;
        },
    }),
        n.initKeyboardEvent ? n.initKeyboardEvent("keyup", !0, !0, document.defaultView, e, e, "", "", !1, "") : n.initKeyEvent("keyup", !0, !0, document.defaultView, !1, !1, !1, !1, e, 0),
        (n.keyCodeVal = e),
        document.body.dispatchEvent(n);
}
setInterval(function () {
    Runner.instance_.horizon.obstacles.length > 0 &&
        (Runner.instance_.horizon.obstacles[0].xPos < 25 * Runner.instance_.currentSpeed - Runner.instance_.horizon.obstacles[0].width / 2 && Runner.instance_.horizon.obstacles[0].yPos > 75 && (keyUp(40), keyDown(38)),
        Runner.instance_.horizon.obstacles[0].xPos < 30 * Runner.instance_.currentSpeed - Runner.instance_.horizon.obstacles[0].width / 2 && Runner.instance_.horizon.obstacles[0].yPos <= 75 && keyDown(40));
}, 5);
console.log("ai now automatically playing dino.")
  `)
}
//autoPlay();

function changeTextureMenu() {
    MenuItemsVisibility(16, "hide")
    createMenuItemSubMenu(17, "<a id='hideTextureMenuButton' onclick='hideTextureMenu()'>(Back)</a>")
    createMenuItemSubMenu(17, "<a id='defaultTexture' onclick='changeTexture(1)'>Default Texture</a>", "changeTexture")
    createMenuItemSubMenu(17, "<a id='mcTexture' onclick='changeTexture(2)'>Minecraft Texture</a>", "changeTexture")
    createMenuItemSubMenu(17, "<a id='customTexture' onclick='changeTexture(3)'>Custom Texture</a>", "changeTexture")
    document.getElementById("changeTexture").hidden = true;
    //document.getElementById("mcTexture").onclick = "changeTexture('mc')";
}

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function changeTexture(texture) {
    var x = 1;
    if (texture == 1) {
        console.log("turning off other textures and making it default.")
        document.getElementById('offline-resources-1x').src = 'data:image/png;base64,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';
    } else {
        if (texture == 2) {
            console.log("turning on minecraft textures")
            document.getElementById('offline-resources-1x').src = 'https://i.imgur.com/vhUjTZL.png';
        } else {
            if (texture == 3) {
                var getUrlInput = prompt("Enter URL To PNG", "");
                IsAUrl = isValidHttpUrl(getUrlInput);
                if(IsAUrl) {
                    document.getElementById('offline-resources-1x').src = getUrlInput;
                    console.log("- Custom Texture -")
                    console.log("Set Custom Texture. ("+getUrlInput+")")
                    console.log("------------------")
                }
                
            }
        }
    }
}
function breakTheGame() {
    Runner.instance_.crashed = true;
    setTimeout(function() {
        breakTheGame();
    }, 1);
}
function breakGame() {
    alert("why would you want to break the game?")
    
    if (confirm('you sure?')) {
        breakTheGame();
    } else {
        console.log('canceled the break the game function');
    }
}
function hideTextureMenu() {
    //document.getElementById("changeSpeed").hidden = false;
    deleteElementsById("mcTexture")
    deleteElementsById("defaultTexture")
    deleteElementsById("hideTextureMenuButton")
    deleteElementsById("MenuItemSubItem")
    document.getElementById("changeTexture").hidden = false;

    MenuItemsVisibility("", "show")

}

function setMsPerFrame() {
    input = document.getElementById("MsPerFrameInput").value;
    Runner.instance_.msPerFrame = input;
}

function createObstacleCreationMenu() {

    document.getElementById("IncreaseObstacleCreationMenu").hidden = true;
    MenuItemsVisibility(21, "hide")
    createMenuItemSubMenu(22, "<a id='hideObstacleCreationMenuButton' onclick='deleteObstacleCreationMenu()'>(Back)</a>","")
    createMenuItemSubMenu(22, "<a id='ObstacleCreationTitle'>--- Set Upcoming Obstacles ---</a>","")
    createMenuItemSubMenu(22, "<a id='ADDCACTUS_SMALL' onclick='increaseObstacleCreation(1)'>Add A Small Cactus To Obstacle List</a>","","")
    createMenuItemSubMenu(22, "<a id='ADDCACTUS_LARGE' onclick='increaseObstacleCreation(2)'>Add A Large Cactus To Obstacle List</a>","","")
    createMenuItemSubMenu(22, "<a id='ADDPTERODACTYL' onclick='increaseObstacleCreation(3)'>Add A Pterodactyl To Obstacle List</a>","","")
    createMenuItemSubMenu(22, "<a id='Remove Last Obstacle In List' onclick='removeLastestObstacleCreation()'>Remove Newest Creation From Obstacle List</a>","","")
    createMenuItemSubMenu(22, "-----------------------------------------------------")
    createMenuItemSubMenu(22, "<a id='CACTUS_SMALL_COUNT'># Of Small Cactuses's: </a>")
    createMenuItemSubMenu(22, "<a id='CACTUS_LARGE_COUNT'># Of Large Cactuses's: </a>")
    createMenuItemSubMenu(22, "<a id='PTERODACTYL_COUNT'># Of Pterodactyl's: </a>")
    createMenuItemSubMenu(22, "-----------------------------------------------------")
    createMenuItemSubMenu(22, "<a id='FullObstacleList'>Obstacle List: </a>")
    createMenuItemSubMenu(22, "-----------------------------------------------------")
    deleteElementsById("obstacles")
    createElementVariable("obstacles","")
}
function deleteObstacleCreationMenu() {
    deleteElementsById("MenuNumber22");
    createMenuItem(22,"<a id='IncreaseObstacleCreationMenu' onclick='createObstacleCreationMenu()'>Increase Obstacle Creation Menu</a>");
    deleteElementsById("obstacles")
    MenuItemsVisibility("", "show")
}
function increaseObstacleCreation(ObstacleToAdd) {
    if(ObstacleToAdd == 1) {
        //testing = Array(getElementVariableValue("obstacles"))
        ObstacleToAddName = "CACTUS_SMALL";
        console.log(ObstacleToAddName)
        beforeValue = getElementVariableValue("obstacles");
        changeElementVariable("obstacles", beforeValue + ObstacleToAddName + ",")
    } else {
        if(ObstacleToAdd == 2) {
            ObstacleToAddName = "CACTUS_LARGE";
            console.log(ObstacleToAddName)
            beforeValue = getElementVariableValue("obstacles");
            changeElementVariable("obstacles", beforeValue + ObstacleToAddName + ",")
            
        } else {
            if(ObstacleToAdd == 3) {
                ObstacleToAddName = "PTERODACTYL";
                console.log(ObstacleToAddName)
                beforeValue = getElementVariableValue("obstacles");
                changeElementVariable("obstacles", beforeValue + ObstacleToAddName + ",")
            }
        }
    }
    setObstcleHistoryToSplitObstacles();
}

//removeAllObstaclesInArray();
function removeLastestObstacleCreation() {
    console.log("Deleting last obstacle in the history.")
    var splitObstacles = String(getElementVariableValue("obstacles")).split(",");
    //splitObstacles.pop();
    console.log(splitObstacles)
    console.log(splitObstacles.splice(splitObstacles.length-1))
    console.log(splitObstacles)
    changeElementVariable("obstacles", splitObstacles)
    Runner.instance_.horizon.obstacleHistory = splitObstacles;
}
function getOccurrence(array, value) {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}
function setObstcleHistoryToSplitObstacles() {
    var splitObstacles = getElementVariableValue("obstacles").split(",");
    Runner.instance_.horizon.obstacleHistory = splitObstacles;
    split = getElementVariableValue("obstacles").split(",");
    var CACTUS_SMALL_COUNT = getOccurrence(split, "CACTUS_SMALL");
    var CACTUS_LARGE_COUNT = getOccurrence(split, "CACTUS_LARGE"); // getOccurrence finds a certain number character or strin an aray and counts how many are in the array
    var PTERODACTYL_COUNT = getOccurrence(split, "PTERODACTYL");
    document.getElementById("CACTUS_SMALL_COUNT").innerHTML = "# of Small Cactuses's:  " + CACTUS_SMALL_COUNT;
    document.getElementById("CACTUS_LARGE_COUNT").innerHTML = "# Of Large Cactuses's: " + CACTUS_LARGE_COUNT;
    document.getElementById("PTERODACTYL_COUNT").innerHTML = "# Of Pterodactyl's: " + PTERODACTYL_COUNT;
    document.getElementById("FullObstacleList").innerHTML = "Obstacle List: " + Runner.instance_.horizon.obstacleHistory;
    setTimeout(function() {
        setObstcleHistoryToSplitObstacles();
    }, 1);
}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------
var isOpen = "false";

function deleteElementsById(id) {
    var allElements = document.querySelectorAll('[id^="' + id + '"]');
    //console.log(allElements)
    console.log(allElements)
    console.log(id)
    console.log("deleted elements with the id: " + id)
    for (let z = 0; z < allElements.length; z++) {
        document.getElementById(id).parentElement.removeChild(allElements[z]);
    }
}
deleteElementsById("menuElement");
deleteElementsById("MenuItemsCount");

var menuElement = document.getElementById("menuElement");

function toggleMenuVisibility(button) {
    if (isOpen == "false") {
        isOpen = "true";
        console.log("Toggle Menu Visibility: Menu Was Opened")
        openNav();
    } else {
        isOpen = "false";
        console.log("Toggle Menu Visibility: Menu Was Closed")
        closeNav();
    }
}

document.onkeypress = function(e) {
    e = e || window.event;
    if (e.key == "m") {
        toggleMenuVisibility(isOpen);
    }
}
;

function openNav() {
    var menuList = document.querySelectorAll(`[id^="menuElement"]`);
    var times = 0;
    document.getElementById("myNav").style.opacity = "100%";
    document.getElementById("myNav").onclick = "myFunction()";
    for (let x = 0; x < menuList.length; x++) {
        menuList[x].style.width = "100%";
        menuList[x].style.opacity = "100%";
        document.getElementById("closeButton").style.opacity = "100%";
        times++
    }
    //console.log("just finished opening all menus (" + times + " menu(s) )")
}

function closeNav() {
    document.getElementById("content").style.opacity = "0%";
    document.getElementById("closeButton").style.opacity = "0%";
    document.getElementById("myNav").style.opacity = "0%";
    try {
        if (document.getElementById("firstTimeClose")) {
            changeElementVariable("firstTimeClose", "false")
        } else {
            createElementVariable("firstTimeClose", "true")
            alert("Closed! press m to re-open (this wont pop up next time)")
        }
    } catch (err) {
        console.log(err)
    }
    //createElementVariable("firstTimeClose", "true")
}

function createMenu() {

    var menukeyInnerHTML = "<a>press m to toggle the visibility of the menu</a> <br></br>";

    menukey = document.createElement("a");
    menukey.innerHTML = menukeyInnerHTML;
    menukey.id = "menuKey";
    //document.body.append(menukey);

    var menu = `<br></br><div id="elementVariables" hidden></div><div id="myNav" class="overlay" style="width: 45%; opacity: 100; border: thick solid #0000FF"><a href="javascript:void(0)" id="closeButton" class="closebtn" title="close menu" onclick="closeNav()" style="opacity: 1;">X</a><!-- Overlay content -->
    <div class="overlay-content" id="content" style="opacity: 1; width: 100%;"></div></div>`;

    menuElement = document.createElement("div");
    menuElement.innerHTML = menu;
    menuElement.id = "menuElement";
    //--
    menuElement.style = "position: fixed; z-index: 10; height: 100%; width: 100%; overflow: scroll;";
    //menuElement.style.bottom = "1px";
    //menuElement.style.userSelect = "none";
    //menuElement.style.position = "fixed";
    //menuElement.style.zIndex = 10;
    // display over dino and obstacles

    //---
    menuElement.onscroll = "menuScroll()";
    document.body.append(menuElement);

}

function createMenuItem(number, innerhtmlofa) {

    subElement = document.createElement("a");
    subElement.innerHTML = "<br>" + innerhtmlofa + "<br>";
    subElement.id = "MenuNumber" + number;

    OldMenuItemsCount = document.getElementById("MenuItemsCount").innerText;
    newCount = Number(OldMenuItemsCount) + 1;
    changeElementVariable("MenuItemsCount", newCount)

    document.getElementById("myNav").append(subElement);
}
createMenu();

function createElementVariable(varName, value) {
    subElement = document.createElement("a");
    subElement.innerHTML = value;
    subElement.id = varName;
    subElement.hidden = true;
    document.body.append(subElement);
    //document.getElementById("menuElement").append(subElement);
    //document.getElementById("elementVariables").append(subElement);
}
deleteElementsById("MenuItemsCount");
createElementVariable("MenuItemsCount", 0);

function changeElementVariable(varName, value) {
    elementVar = document.getElementById(varName);
    elementVar.innerHTML = value;
}
function getElementVariableValue(varName) {
    try {
        ElementVariable = document.getElementById(varName);
        return ElementVariable.innerText;
    } catch (err) {
        console.log("Cant get value! try checking if your typing in the right id or it might not exsist!")
        console.log("-------------------------- error message ------------------------------------------------------\n" + err + "\n")
        console.log("-----------------------------------------------------------------------------------------------")
    }
}
function hideMenuItem(number) {
    try {
        document.getElementById("MenuNumber"+number).hidden = true;
        console.log("-- Hide Menu Item Function --")
        console.log("Hid: MenuNumber"+number)
        console.log("-----------------------------")
    } catch(err) {
        console.log("-- Hide Menu Item Function --")
        console.log("Couldnt Hide: MenuNumber"+number)
        console.log("function parameter given: ("+number+")")
        console.log("-----------------------------")
    }
}
// menus need ids for the submenu function so it can hide the text that was clicked to open the menu
createMenuItem(1, "<a> --- Dino Hacks --- </a>");
var version = getElementVariableValue("version")
var newHTML = "<br><a> --- Dino Hacks "+ version +"--- </a><br>";
document.getElementById("MenuNumber1").innerHTML = newHTML;
createMenuItem(2, "<a id='changeSpeed' onclick='speedMenu()'>Change Speed</a>");
createMenuItem(3, "<a onclick='removeObstacles()'> Remove All Obstacles </a>");
createMenuItem(4, "<a onclick='setDistance()'>Set Distance </a><input onkeypress='validate(event)' id='distanceInput'></input><button id='distanceSetButton' onclick='setDistance()'>Set Distance Ran</button>");
createMenuItem(5, "<a onclick='darkBackground()'> Invert Colors (light/dark mode) </a>");
createMenuItem(6, "<a onclick='GodModeToggle()'>God Mode</a>");
createMenuItem(7, "<a onclick='setJumpVelocity()'>Set Jump Velocity </a><input onkeypress='validate(event)' id='velocityInput'></input><button id='velocitySet' onclick='setJumpVelocity()'>Set Velocity</button>");
createMenuItem(8, "<a onclick='lazers()'>Shoot Lazers (removes obstacles ahead) (Click me then Press D)</a>")
createMenuItem(9, "<a onclick='beinvisible()'>Invisible (*DOES NOT MAKE YOU INVINCIBLE*)</a>")
createMenuItem(10, "<a onclick='setGravity()'>Set Gravity </a><input onkeypress='validate(event)' id='gravityInput' value='0.6'></input><button id='gravitySetButton' onclick='setGravity()'>Set Gravity</button>");
createMenuItem(11, "<a onclick='setGravityToNone()'>Go to space! (prob. forever) (press space after clicking me)</a>");
createMenuItem(12, "<a onclick='freezeDino()'> Freeze (and get points)</a>");
createMenuItem(13, "<a onclick='breakGraphics()'>Break Graphics</a>");
createMenuItem(14, "<a onclick='autoPlay()'> Auto Play (ai plays for you!)</a>")
createMenuItem(15, "<a id='changeDimensions' onclick='dimensionsMenu();'>Game Window Dimensions</a>")
createMenuItem(16, "<a onclick='removeObstaclesOnVision()'>Remove Obstacles On View</a>")
createMenuItem(17, "<a id='changeTexture' onclick='changeTextureMenu()'>Change Textures</a>")
createMenuItem(18, "<a onclick='setDistance()'>Set Ms Per Frame (low = faster points and low = slower points)</a><input onkeypress='validate(event)' id='MsPerFrameInput'></input><button id='MsPerFrameSetButton' onclick='setMsPerFrame()'>Set Ms Per Frame</button>")
createMenuItem(19, "<a id='toggleInfoMenu' onclick='updateInfoMenuVisibility();'>Toggle Info Menu</a>")
createMenuItem(20, "<a id='obstacleMenu' onclick='obstacleMenu()'>Obstacle Menu</a>")
hideMenuItem(20)
createMenuItem(21, "<a id='removeBottomLine' onclick='removeBottomLine()'>Remove Bottom Line</a>")
createMenuItem(22,"<a id='IncreaseObstacleCreationMenu' onclick='createObstacleCreationMenu()'>Increase Obstacle Creation Menu</a>")
hideMenuItem(22);
createMenuItem(23, "<a onclick='breakGame()'>Break Game</a>")
createMenuItem(24, "<a id='menuSettingsA' onclick='openSettingsMenu()'>Menu Settings</a>")
createMenuItem(25, "<a onclick='openJumpMenu()'>Jump Menu</a>")
hideMenuItem(25)
changeMenuItemOrder(25,23) // make 25 below 24
createMenuItem(26, "<a id='soundMenu' onclick='openSoundMenu()'>Sound Menu</a>")
changeMenuItemOrder(26,25)
createMenuItem(27, "<a onclick='turnonflight()'>Turn on Flight (Up arrow = up & down arrow is down)</a>")
changeMenuItemOrder(27, 26)
//- end of menu items creation-

function turnonflight() {
    alert("(the key s is now duck instead of the down arrow!)")
    window.addEventListener("keydown", checkKeyPressed, false);
    Runner.keycodes.JUMP = {32:1} // remove up arrow from jump keycodes
    Runner.keycodes.DUCK = {83:1} // set duck key to s
    function checkKeyPressed(evt) {
        if (evt.keyCode == "38") {
            Runner.instance_.tRex.yPos = Runner.instance_.tRex.yPos-5;
        } else {
            if(evt.keyCode == "40") {
                Runner.instance_.tRex.yPos = Runner.instance_.tRex.yPos+5;
            } 
        }
    }
}

function openJumpMenu() {
    
}
function openSoundMenu() {
    MenuItemsVisibility(25, "hide")
    document.getElementById("soundMenu").hidden = true;
     createMenuItemSubMenu(26, "<a>--- Press anyone to play the sound ---</a>")
    createMenuItemSubMenu(26, "<a onclick='playSound(1)'>SCORE</a>")
    createMenuItemSubMenu(26, "<a onclick='playSound(2)'>HIT</a>")
    createMenuItemSubMenu(26, "<a onclick='playSound(3)'>BUTTON_PRESS</a>")
    createMenuItemSubMenu(26, "<a onclick='playSound(4)'>All (*earrape*)</a>")
    createMenuItemSubMenu(26, "<a onclick='playSound(5)'>EARRAPE >>> chose how loud it is: </a><input id='TimesToPlayInput'></input>")
}
function playSound(sound) {
    if(sound == 1) {
        Runner.instance_.playSound(Runner.instance_.soundFx.SCORE)
    } else {
        if(sound == 2) {
            Runner.instance_.playSound(Runner.instance_.soundFx.HIT)
        } else {
            if(sound == 3) {
                Runner.instance_.playSound(Runner.instance_.soundFx.BUTTON_PRESS)
            } else {
                if(sound == 4) {
                    Runner.instance_.playSound(Runner.instance_.soundFx.SCORE);Runner.instance_.playSound(Runner.instance_.soundFx.HIT);Runner.instance_.playSound(Runner.instance_.soundFx.BUTTON_PRESS)
                } else {
                    if(sound === 5) {
                        input = document.getElementById("TimesToPlayInput").value;
                        if(input == '') {
                            input = 1;
                        } else {
                            if(input > 100) {
                                alert("this is too loud that it will break the game sorry. try 100 or less")
                            } else {
                                for(i=1; i < (input+1); i++) { 
                                    Runner.instance_.playSound(Runner.instance_.soundFx.SCORE);
                                    Runner.instance_.playSound(Runner.instance_.soundFx.HIT);
                                    Runner.instance_.playSound(Runner.instance_.soundFx.BUTTON_PRESS);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
function openSettingsMenu() {
    document.getElementById("menuSettingsA").hidden = true;
    MenuItemsVisibility(23, "hide")
    createMenuItemSubMenu(24, "<a onclick='hideSettingsMenu()'>(Back)</a>")
    createMenuItemSubMenu(24, "- Menu X & Y -")
    createMenuItemSubMenu(24, "<a id='MenuXY'>X: 0, Y: 0</a>")
    createMenuItemSubMenu(24, "<a>Menu X:</a><input id='menuXinput'></input><button onclick='setMenuX()'>Set X</button>")
    createMenuItemSubMenu(24, "<a>Menu Y:</a><input id='menuYinput'></input><button onclick='setMenuY()'>Set Y</button>")
    createMenuItemSubMenu(24, "-------------------")
    createMenuItemSubMenu(24, "-Color Of Menu Border-")
    createMenuItemSubMenu(24, "<a>R</a><input id='rInput'></input>")
    createMenuItemSubMenu(24, "<a>G</a><input id='gInput'></input>")
    createMenuItemSubMenu(24, "<a>B</a><input id='bInput'></input>")
    createMenuItemSubMenu(24, "<button onclick='setBorderRGB()'>Set Border RGB</button>")
    createMenuItemSubMenu(24, "-------------------")
    createMenuItemSubMenu(24,"<a onclick='makeBorderRGBLoop();'>RGB Loop</a>")
    createMenuItemSubMenu(24, "-------------------")
    createMenuItemSubMenu(24, "<a onclick='setTitle();'>Set Window Title</a>")
    createMenuItemSubMenu(24, "-------------------")
    createMenuItemSubMenu(24, "<a onclick='toggleBodyHideKey()'>Hide Game & Menu (when on press ` or ~)</a>")
    createMenuItemSubMenu(24, "-------------------")
    createMenuItemSubMenu(24, "<a onclick='deleteMenu();'>Delete Menu</a>")
    startLoop();
}
try {
    deleteElementsById("HideBodyOn")
} catch(err) {
    
}
createElementVariable("HideBodyOn", "false")
function toggleBodyHideKey() {
    hide = getElementVariableValue("HideBodyOn")
    if(hide == 'false') {
        changeElementVariable("HideBodyOn", 'true')
        document.body.hidden = true;
    } else {
        changeElementVariable("HideBodyOn", 'false')
        document.body.hidden = false;
    }
}

function setTitle() {
    var input = prompt("Enter new title name:");
    input = input.replace(/[&\/\\#,+()$~%.'":*?<>!@{}]/g, '');
    document.title = input;
}
function startLoop() {
    updateMenuXY();
}
function updateMenuXY() {
    var xyz = document.getElementById("myNav").style.transform;
    xyz = String(xyz).split(" ");
    xyz = String(xyz).split("(");
    xyz = String(xyz).split(",")
    //console.log(xyz)
    var MenuX = xyz[1];
    var MenuY = xyz[3];
    if(document.getElementById("MenuXY") == null) {
        //console.log("Cant update x y element since the settings menu hasnt been opened")
    } else {
        document.getElementById("MenuXY").innerHTML = "X: " + MenuX + ", Y: " + MenuY;
    }
    setTimeout(function() {  
        updateMenuXY();
    }, 100)
}
function setMenuX() {
    var xyz = document.getElementById("myNav").style.transform;
    xyz = String(xyz).split(" ");
    xyz = String(xyz).split("(");
    xyz = String(xyz).split(",")
    var MenuX = xyz[1];
    MenuXInput = document.getElementById("menuXinput").value;
    if(MenuYInput == '') {
        MenuYInput = MenuY;
    } else {
      document.getElementById("myNav").style.transform = 'translate3d(' + Number(MenuXInput) + 'px, ' + MenuY + ', 0px)';  
    }
}
function setMenuY() {
    var xyz = document.getElementById("myNav").style.transform;
    xyz = String(xyz).split(" ");
    xyz = String(xyz).split("(");
    xyz = String(xyz).split(",")
    var MenuY = xyz[3];
    MenuYInput = document.getElementById("menuYinput").value;
    if(MenuYInput == '') {
        MenuYInput = MenuY;
    } else {
        console.log('translate3d(' + MenuX + ', ' + MenuYInput + ', 0px)')
        document.getElementById("myNav").style.transform = 'translate3d(' + MenuX + ', ' + MenuYInput + 'px, 0px)'; 
    }
}
function hideSettingsMenu() {
    document.getElementById("menuSettingsA").hidden = false;
    document.getElementById("MenuNumber24").remove();
    createMenuItem(24, "<a onclick='openSettingsMenu()'>Menu Settings</a>")
    MenuItemsVisibility("", "show")
}
function setBorderRGB() {
    R = document.getElementById("rInput").value;
    G = document.getElementById("gInput").value;
    B = document.getElementById("bInput").value;
    // 'thick solid rgb(0, 0, 255)'
    document.getElementById("myNav").style.border = 'thick solid rgb(' +Number(R)+ ', ' +Number(G)+ ', ' +Number(B)
    //console.log('thick solid rgb(' + Number(R) + ', ' + Number(G) + ', ' + Number(B) + ')')
}
//---------------------------------------------------------------------------------------------------
colors = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","RebeccaPurple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];
function topBarRGB(randomInt) {
  for (var i=0; i < randomInt; i++) {
  var topBar = document.getElementById("myNav");
  BarBorder = topBar.style.border;
  BarBorder = BarBorder.split(" ");
  BarBorder[2] = colors[i];
  newBorder = BarBorder[0] + " " + BarBorder[1] + " " + BarBorder[2];
    
  topBar.style.border = newBorder;
  }
}
var x = 1;                  
LoopDelay = 2000;
function myLoop() {         
  setTimeout(function() {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    randomInt = getRandomInt(colors.length);
    topBarRGB(randomInt);
    x++;                    
    if (x > 0) {           
      myLoop();             
    }                       
  }, 2000)
}
  
//---------------------------------------------------------------------------------------------------
function makeBorderRGBLoop() {
    myLoop();
}
function deleteMenu() {
    //menuElement MenuItemsCount version ShowInfoMenu InfoMenu
    deleteElementsById("menuElement")
    deleteElementsById("MenuItemsCount")
    deleteElementsById("version")
    deleteElementsById("ShowInfoMenu")
    deleteElementsById("InfoMenu")
    function myLoop()  {} // without this the rgb loop keeps going if its on and trys to set a non exsisting element's style
    
}

function createMenuItemSubMenu(menuItem, html, menuname, customid) {
    item = document.getElementById("MenuNumber" + menuItem);
    if (menuname == "changeSpeed") {
        document.getElementById("changeSpeed").hidden = true;
    }
    if (menuname == "changeDimensions") {
        document.getElementById("changeDimensions").hidden = true;
    }
    //document.getElementById(menuItemMainA).hidden = true;
    MenuItemSubItem = document.createElement("a");
    MenuItemSubItem.innerHTML = html + "<br>";
    if(customid == undefined) {
        MenuItemSubItem.id = "MenuItemSubItem";
    } else {
        MenuItemSubItem.id = customid;
    }
    item.append(MenuItemSubItem);

}
function createSubMenuSubMenu(id, html, parentid) {
    SubMenuSubMenu = document.createElement("a");
    SubMenuSubMenu.innerHTML = html;
    SubMenuSubMenu.id = id;
    parentid.append(SubMenuSubMenu);
}
function addNumbers() {
    var ItemCount = getElementVariableValue("MenuItemsCount");
    for(i=1; i < (Number(ItemCount)+Number(1)); i++) {
        if(i == 1) {
            continue;
        } else {
            //                                                         (why String(i-1) has -1 >> made 2nd item the first bc the real first item is the title)
            document.getElementById("MenuNumber"+i).children[1].innerHTML = String(i-1)+". "+document.getElementById("MenuNumber"+i).children[1].innerHTML;  
        }
    }
    console.log("---------------")
    console.log("Item Count: "+ItemCount)
    console.log("Added Numbers To Mod Menu (besides title)")
    console.log("---------------")
}
//--
//make menu always visible (how? : removes classes that make some elements push out the menu div)

//document.getElementById("t").className = "neterror"; 
// this one ^ above doesnt really work and still leaves the menu invisible

document.getElementById("main-frame-error").className = "";
// ^^ this should remove the style to the main frame error which will stop it from blocking it and getting pushed past the edge of the page.
//--

//--- make dragable ---
var dragItem = document.querySelector("#myNav");
var container = document.querySelector("#menuElement");
document.getElementById("menuElement").style = "bottom: 1px; position: fixed; z-index: 10; width:100%;";
var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;

container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);

function dragStart(e) {
    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target === dragItem) {
        active = true;
    }
}

function drag(e) {
    if (active) {

        e.preventDefault();

        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, dragItem);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
}
//--------



setDistance(0);

var menuItemsCount = getElementVariableValue("MenuItemsCount");

function MenuItemsVisibility(except, hideorshow) {
    document.getElementById("myNav").style.transform = 'translate3d(91px, 463px, 0px)';
    for (let y = 0; y < Number(menuItemsCount); y++) {
        if (isNaN(except)) {
            console.log("no exceptions")
            // MenuItemsVisibility(1, "hide")
            // hides menu every item besides 1
        } else {
            var Exceptions = String(except).split("~");

            if (Exceptions.includes(String(y))) {
                continue;
            }
        }

        if (hideorshow == "hide") {
            document.getElementById("MenuNumber" + (y + 1)).hidden = true;
        } else {
            document.getElementById("MenuNumber" + (y + 1)).hidden = false;
        }

    }
}

document.getElementById("menuElement").style.overflow = "scroll";
document.getElementById("myNav").style.overflow = "scroll";

deleteElementsById("ShowInfoMenu");
createElementVariable("ShowInfoMenu", "false");


function createInfoMenu() {
    try {
        deleteElementsById("InfoMenu")
    } catch(err) {
        console.log(err)
    }
    InfoMenu = document.createElement("div");
    InfoMenu.id = "InfoMenu";
    InfoMenu.hidden = true;
    InfoMenu.style = "transform: translate3d(2px, 200px, 0px);";
    InfoMenu.innerHTML = `
  <p id="xPos">X:</p>
  <p id="yPos">Y:</p>
  <p id="status">Status:</p>
  <p id="Deaths">Deaths: </p>
  <p id="time">Time Alive: </p>
  <p id="isJumping">Is Jumping: </p>
  `;
    document.body.append(InfoMenu)
}
createInfoMenu();
function updateXandY() {
    ShowInfoMenu = getElementVariableValue("ShowInfoMenu");
    if(ShowInfoMenu == "true") {
        //Runner.instance_.tRex.xPos
        //Runner.instance_.tRex.yPos
        document.getElementById("xPos").innerHTML = "X:" + Runner.instance_.tRex.xPos;
        document.getElementById("yPos").innerHTML = "Y:" + Runner.instance_.tRex.yPos;
        //---
        var status = Runner.instance_.tRex.status;
        var showStatus = "";
        if(status == "DUCKING") {
            showStatus = "Ducking";
        } else {
            status = status[0].toUpperCase();
        }
    
        
        if(status == 'R') {
            showStatus = "Running";
        } else {
            if(status == 'C') {
                showStatus = "You Crashed!";
            } else {
                if(status = 'J') {
                    showStatus = "Jumping";
                } 
            }
        }
    document.getElementById("status").innerHTML = "Status: " + String(showStatus);
    //---
        document.getElementById("Deaths").innerHTML = "Deaths: " + String(Runner.instance_.playCount - 1)
        if(Deaths == 99) {
            alert("how tf did you die 100 times with hacks")
        }
        document.getElementById("time").innerHTML = "Seconds Alive: " + Math.round(Runner.instance_.time / 600);
        document.getElementById("isJumping").innerHTML = "Is Jumping: " + Runner.instance_.tRex.jumping;
        setTimeout(function() {
            updateXandY();
        }, 1);
    }
}
function updateInfoMenuVisibility() {
    ShowInfoMenu = getElementVariableValue("ShowInfoMenu");
    if(ShowInfoMenu == "false") {
        changeElementVariable("ShowInfoMenu", "true")
        document.getElementById("InfoMenu").hidden = false;
        updateXandY();
    } else {
        // showInfoMenu true >>> false
        if(ShowInfoMenu == "true") {
            changeElementVariable("ShowInfoMenu", "false")
            document.getElementById("InfoMenu").hidden = true;
        }
    }
}
//updateInfoMenuVisibility();


function obstacleMenu() {
    document.getElementById("obstacleMenu").hidden = true;
    MenuItemsVisibility(19, "hide")
    createMenuItemSubMenu(20, "<a id='hideObstacleMenuButton' onclick='hideSmallCactusMenu()'>(Back)</a>","")
    createMenuItemSubMenu(20, "<a id='SmallCactus' onclick='smallCactusMenu()'>Small Cactus</a>","","SmallCactusParent")
    createMenuItemSubMenu(20, "<a id='LargeCactus' onclick='largeCactusMenu()'>Large Cactus</a>","","LargeCactusParent")
    createMenuItemSubMenu(20, "<a id='Pterodactyl' onclick='PterodactylMenu()'>Pterodactyl</a>","","PterodactylParent")
    //
}

function hideCactusMenuButton() {
}

function smallCactusMenu() {
    document.getElementById("SmallCactusParent").hidden = true;
    document.getElementById("LargeCactusParent").hidden = true;
    document.getElementById("PterodactylParent").hidden = true;
    //document.getElementById("MenuItemSubItem").hidden = true;
    //---
    createMenuItemSubMenu(20, "<a id='SmallCactusTitle'>--- All Small Cactus's Dimensions, Coords and Min Gap ---</a>")
    createMenuItemSubMenu(20, "<a id='SmallCactusWidth'>Width:</a><input id='SmallCactusWidthInput'></input><button onclick='setSmallCactusWidth()'>Set Width</button>","","SmallCactusWidthSubSubItem")
    createMenuItemSubMenu(20, "<a id='SmallCactusHeight'>Height:</a><input id='SmallCactusHeightInput'></input><button onclick='setSmallCactusHeight()'>Set Height</button>","","SmallCactusHeightSubSubItem")
    createMenuItemSubMenu(20, "<a id='SmallCactusYPos'>Y Position:</a><input id='SmallCactusYPosInput'></input><button onclick='setSmallCactusYPos'>Set Y Position</button>","","SmallCactusYPosSubSubItem")
    createMenuItemSubMenu(20, "<a id='SmallCactusMinGap'>Min Gap Between</a><input id='SmallCactusMinGapInput'></input><button onclick='setSmallCactusMinGap()'>Set Minimum Gap</button>","","SmallCactusMinGapSubSubItem")
    createMenuItemSubMenu(20, "<a id='spacer'>--------------------------------------------------------------------------------------------------</a>","","space")
    createMenuItemSubMenu(20, "<a id='SmallCactusHitBoxesTitle'>--- HitBox ---</a>","","SmallCactusHitBoxesTitle")
    createMenuItemSubMenu(20, "<a id='SmallCactusHitBoxWidth'>HitBox Width</a><input id='SmallCactusHitBoxWidthInput'></input><button onclick='setSmallCactusHitBoxWidth()'>Set HitBox Width</button>","","")
    createMenuItemSubMenu(20, "<a id='SmallCactusHitBoxHeight'>HitBox Height</a><input id='SmallCactusHitBoxHeightInput'></input><button onclick='setSmallCactusHitBoxHeight()'>Set HitBox Height</button>","","")
    createMenuItemSubMenu(20, "<a id='SmallCactusHitBoxX'>Set HitBox X</a><input id='SmallCactusHitBoxXInput'></input><button onclick='setSmallCactusHitBoxX()'>Set HitBox X</button>","","")
    createMenuItemSubMenu(20, "<a id='SmallCactusHitBoxY'>HitBox Y</a><input id='SmallCactusHitBoxYInput'></input><button onclick='setSmallCactusHitBoxY()'>Set HitBox Y</button>","","")
    
}
function hideSmallCactusMenu() {
    document.getElementById("SmallCactusParent").hidden = true;
    document.getElementById("LargeCactusParent").hidden = true;
    document.getElementById("PterodactylParent").hidden = true;
    //document.getElementById("MenuItemSubItem").hidden = true;
    //---
    deleteElementsById("MenuNumber20")
    createMenuItem(20, "<a id='obstacleMenu' onclick='obstacleMenu()'>Obstacle Menu</a>")
    console.log("menu item 20 was deleted and then was recreated.")
    MenuItemsVisibility("", "show");
}
//---  Small Cactus Functions ---
function setSmallCactusWidth() {
    Runner.spriteDefinition.OBSTACLES[0].width = document.getElementById("SmallCactusWidthInput").value;
}
function setSmallCactusHeight() {
    Runner.spriteDefinition.OBSTACLES[0].height = document.getElementById("SmallCactusHeightInput").value;
}
function setSmallCactusYPos() {
    Runner.spriteDefinition.OBSTACLES[0].yPos = document.getElementById("SmallCactusYPosInput").value;
}
function setSmallCactusMinGap() {
    Runner.spriteDefinition.OBSTACLES[0].yPos = document.getElementById("SmallCactusMinGapInput").value;
}
function setSmallCactusHitBoxWidth() {
    // Runner.spriteDefinition.OBSTACLES[0]   is small cactus
    Runner.spriteDefinition.OBSTACLES[0].collisionBoxes[0].width = document.getElementById("SmallCactusHitBoxWidthInput").value;
    Runner.spriteDefinition.OBSTACLES[0].collisionBoxes[1].width = document.getElementById("SmallCactusHitBoxWidthInput").value;
    Runner.spriteDefinition.OBSTACLES[0].collisionBoxes[2].width = document.getElementById("SmallCactusHitBoxWidthInput").value;
}
function setSmallCactusHitBoxHeight() {
    Runner.spriteDefinition.OBSTACLES[0].collisionBoxes[0].height = document.getElementById("SmallCactusHitBoxHeightInput").value;
    Runner.spriteDefinition.OBSTACLES[0].collisionBoxes[1].height = document.getElementById("SmallCactusHitBoxHeightInput").value;
    Runner.spriteDefinition.OBSTACLES[0].collisionBoxes[2].height = document.getElementById("SmallCactusHitBoxHeightInput").value;
}
function setSmallCactusHitBoxX() {
    Runner.spriteDefinition.OBSTACLES[0].collisionBoxes[0].x = document.getElementById("SmallCactusHitBoxXInput").value;
    Runner.spriteDefinition.OBSTACLES[0].collisionBoxes[1].x = document.getElementById("SmallCactusHitBoxXInput").value;
    Runner.spriteDefinition.OBSTACLES[0].collisionBoxes[2].x = document.getElementById("SmallCactusHitBoxXInput").value;
    
}
function setSmallCactusHitBoxY() {
    Runner.spriteDefinition.OBSTACLES[0].collisionBoxes[0].y = document.getElementById("SmallCactusHitBoxYInput").value;
    Runner.spriteDefinition.OBSTACLES[0].collisionBoxes[1].y = document.getElementById("SmallCactusHitBoxYInput").value;
    Runner.spriteDefinition.OBSTACLES[0].collisionBoxes[2].y = document.getElementById("SmallCactusHitBoxYInput").value;
}
//----------------------end of small cactus functions--------------------
function largeCactusMenu() {
    
}
function PterodactylMenu() {
}
//-------------------- end of the creation of the obstacle menu---------------------------------
deleteElementsById("autoPlay")
// - other stuff -
document.getElementById("myNav").style = "width: 40%; opacity: 100; border: thick solid rgb(0, 0, 255); overflow: scroll; transform: translate3d(303px, 12px, 0px);";

Runner.config.MAX_BLINK_COUNT = 69420;


window.addEventListener('keydown', function() {
    if (event.keyCode == 32) {
        window.dispatchEvent(new KeyboardEvent('keydown', {'key':' '} ));
        window.dispatchEvent(new KeyboardEvent( 'keyup' , {'key':' '} ));
    }
});

// this ^ might fix not being able to press space to play again after dying because it tries to space scroll
document.getElementById("menuElement").style.height = "1000px";
//----------------------------
//console.clear();
console.log("done removing old elements (to prevent duplicates)")
console.log("finished injecting the menu.")
