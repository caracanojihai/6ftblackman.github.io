const levels = [
//level 0
["","obstacle2", "obstacle2","","rider",
"target", "hurdleup", "animate","animate","animate",
"hurdle","obstacle3","","","obstacle3",
"","obstacle3","", "obstacle2","obstacle",
"","hurdleup","lbup","obstacle","obstacle2"],

//level 1
["","", "","","",
"animate", "animate", "hurdle","obstacle2","",
"rider","obstacle2","target","hurdleup","",
"obstacle3","obstacle2","hurdleup", "obstacle2","",
"lbright","","","",""],

//level 2
["target","", "obstacle3","","",
"hurdle", "obstacle3", "obstacle3","obstacle3","obstacle2",
"","obstacle2","obstacle3","rider","",
"hurdle","obstacle2","animate", "animate","animate",
"","obstacle2","wing","","lbleft"],

//level 3
["","wing", "","","",
"obstacle3", "obstacle3", "obstacle3","hurdle","hurdle",
"obstacle3","target","obstacle3","animate","animate",
"obstacle3","obstacle3","obstacle3", "","",
"obstacle","rider","","","lbleft"],

//level 4
["","wing", "animate","animate","target",
"rider", "obstacle", "obstacle","hurdle","obstacle3",
"","","","","",
"obstacle","obstacle","obstacle", "obstacle","",
"lbright","","","",""]
];//end of level

const gridBoxes = document.querySelectorAll("#gameBoard div");

const noPassObstacles = ["obstacle","obstacle2"];
var currentLevel = 0;//starting level
var riderOn = false; //is rider on
var currentLocationOfLb =0;
var currentAnimation;//allows 1 animation per level
var widthOfBoard = 5;
var dead = false;
var canMove = true;
var time = 15;
var wing = false;


//game start
window.addEventListener("load", function(){
loadLevel();
});
//timer




// move player
document.addEventListener("keydown", function (e) {

switch (e.keyCode){
case 37: //left arrow
if(currentLocationOfLb % widthOfBoard !== 0 && canMove == true){
tryToMove("left");
}
break;
case 38: //up arrow
if(currentLocationOfLb - widthOfBoard >= 0 && canMove == true){
tryToMove("up");
}
break;
case 39: //right arrow
if(currentLocationOfLb % widthOfBoard < widthOfBoard - 1 && canMove == true){
tryToMove("right");
}
break;
case 40: //down arrow
if(currentLocationOfLb + widthOfBoard < widthOfBoard * widthOfBoard && canMove == true){
tryToMove("down");
}
break;
} // switch

}); //key event listener

 
//try to move lb
function tryToMove(direction){
let oldLocation = currentLocationOfLb; //location before move
let oldClassName = gridBoxes[oldLocation].className;//class of location befoerwe move
nextClass =""; //class of location we wish to move to
let nextLocation = 0; // location we wish to move to
let newClass = "";// new class to switch if move successful
let nextLocation2 = 0;
let nextClass2 = "";


switch(direction){
case "left":
nextLocation = currentLocationOfLb -1;
break;
case "right":
nextLocation = currentLocationOfLb +1;
break;
case "up":
nextLocation = currentLocationOfLb - widthOfBoard;
break;
case "down":
nextLocation = currentLocationOfLb + widthOfBoard;
break;
}//switch
nextClass = gridBoxes[nextLocation].className;

//if obstacle is not passable, dont move
if(noPassObstacles.includes(nextClass)){return;}

if(nextClass.includes("obstacle3") && wing == false){return;}


//if it has wings
//win and rider are on then it can go through holes
if(nextClass.includes("obstacle3")){
	if( wing == true&& riderOn == true){
gridBoxes[currentLocationOfLb].className = "";
oldClassName = gridBoxes[nextLocation].className;



//set values according to direction
if(direction == "left" ){
nextClass = "wingholeleft";
nextClass2 = "lbridewingleft";
nextLocation2 = nextLocation - 1;

}else if (direction == "right" ){
nextClass = "wingholeright";
nextClass2 = "lbridewingright";
nextLocation2 = nextLocation + 1;
;
}else if (direction == "up"){
nextClass = "wingholeup";
nextClass2 = "lbridewingup";
nextLocation2 = nextLocation - widthOfBoard;
}else if (direction == "down"){
nextClass = "wingholedown";
nextClass2 = "lbridewingdown";
nextLocation2 = nextLocation + widthOfBoard;
}
//so it cant go over obstacles
if(gridBoxes[nextLocation2].className.includes("obstacle")){
if(direction == "left"){
gridBoxes[currentLocationOfLb].className = "lbridewingleft";
return;

}
else if(direction == "right"){
gridBoxes[currentLocationOfLb].className = "lbridewingright";
return;
}
else if(direction == "up"){
gridBoxes[currentLocationOfLb].className = "lbridewingup";
return;
}
else if(direction == "down"){
gridBoxes[currentLocationOfLb].className = "lbridewingdown";
return;
}

}


//show lb jumping
gridBoxes[nextLocation].className = nextClass;
canMove = false;

setTimeout(function(){
//set jump back to just a fence
gridBoxes[nextLocation].className = oldClassName;
console.log(nextLocation2);
//update current location of lb to be 2 spaces past take off
currentLocationOfLb = nextLocation2;
console.log("updating current location " + currentLocationOfLb);

//get class of box after jump
nextClass = gridBoxes[currentLocationOfLb].className;


//show lb and rider after landing
 gridBoxes[currentLocationOfLb].className = nextClass2;
 canMove = true;
 console.log("Animation updating div " + currentLocationOfLb + " to " + nextClass2 + nextClass);
//if new box is target go up a level
levelUp(nextClass);
}, 350);
return;
	}
}//if there is rider and wing



//if its a fence with no rider dont move
if(riderOn == false && nextClass.includes("hurdle")){return;}

if(riderOn == false && nextClass.includes("wing")){return;}

//if its side pole

//if there is a fence move two spaces with animation  (need to add if jump goes to a obstacle)
if(nextClass.includes("hurdle")){

if(riderOn && wing){
gridBoxes[currentLocationOfLb].className = "";
oldClassName = gridBoxes[nextLocation].className;

//so it can go though side
if((direction == "up" || direction == "down")&& nextClass == "hurdleup"){


if(direction =="down"){
gridBoxes[currentLocationOfLb].className = "lbridewingdown";
return;
}
if(direction =="up"){
gridBoxes[currentLocationOfLb].className = "lbridewingup";
return;
}

}
if((direction == "right" || direction == "left")&& nextClass == "hurdle"){


if(direction =="right"){
gridBoxes[currentLocationOfLb].className = "lbridewingright";
return;
}
if(direction =="left"){
gridBoxes[currentLocationOfLb].className = "lbridewingleft";

return;
}

}

//set values according to direction
if(direction == "left" && !gridBoxes[nextLocation2].className.includes("obstacle")){
nextClass = "wingfenceleft";
nextClass2 = "lbridewingleft";
nextLocation2 = nextLocation - 1;
}else if (direction == "right" && !gridBoxes[nextLocation2].className.includes("obstacle")){
nextClass = "wingfenceright";
nextClass2 = "lbridewingright";
nextLocation2 = nextLocation + 1;
}else if (direction == "up" && !gridBoxes[nextLocation2].className.includes("obstacle")){
nextClass = "wingfenceup";
nextClass2 = "lbridewingup";
nextLocation2 = nextLocation - widthOfBoard;
}else if (direction == "down" && !gridBoxes[nextLocation2].className.includes("obstacle")){
nextClass = "wingfencedown";
nextClass2 = "lbridewingdown";
nextLocation2 = nextLocation + widthOfBoard;
}
//so it cant go over obstacles
if(gridBoxes[nextLocation2].className.includes("obstacle")){
if(direction == "left"){
gridBoxes[currentLocationOfLb].className = "lbridewingleft";
return;

}
else if(direction == "right"){
gridBoxes[currentLocationOfLb].className = "lbridewingright";
return;
}
else if(direction == "up"){
gridBoxes[currentLocationOfLb].className = "lbridewingup";
return;
}
else if(direction == "down"){
gridBoxes[currentLocationOfLb].className = "lbridewingdown";
return;
}

}


//show lb jumping
gridBoxes[nextLocation].className = nextClass;
canMove = false;

setTimeout(function(){
//set jump back to just a fence
gridBoxes[nextLocation].className = oldClassName;

//update current location of lb to be 2 spaces past take off
currentLocationOfLb = nextLocation2;
console.log("updating current location " + currentLocationOfLb);

//get class of box after jump
nextClass = gridBoxes[currentLocationOfLb].className;


//show lb and rider after landing
 gridBoxes[currentLocationOfLb].className = nextClass2;
 canMove = true;
 console.log("Animation updating div " + currentLocationOfLb + " to " + nextClass2 + nextClass);
//if new box is target go up a level
levelUp(nextClass);
}, 350);
return;
}//if there is rider and wing


//rider must be on
else if(riderOn){
gridBoxes[currentLocationOfLb].className = "";
oldClassName = gridBoxes[nextLocation].className;

//so it can go though side
if((direction == "up" || direction == "down")&& nextClass == "hurdleup"){


if(direction =="down"){
gridBoxes[currentLocationOfLb].className = "lbridedown";
return;
}
if(direction =="up"){
gridBoxes[currentLocationOfLb].className = "lbrideup";
return;
}

}
if((direction == "right" || direction == "left")&& nextClass == "hurdle"){


if(direction =="right"){
gridBoxes[currentLocationOfLb].className = "lbrideright";
return;
}
if(direction =="left"){
gridBoxes[currentLocationOfLb].className = "lbrideleft";

return;
}

}

//set values according to direction
if(direction == "left" && !gridBoxes[nextLocation2].className.includes("obstacle")){
nextClass = "jumpleft";
nextClass2 = "lbrideleft";
nextLocation2 = nextLocation - 1;
}else if (direction == "right" && !gridBoxes[nextLocation2].className.includes("obstacle")){
nextClass = "jumpright";
nextClass2 = "lbrideright";
nextLocation2 = nextLocation + 1;
}else if (direction == "up" && !gridBoxes[nextLocation2].className.includes("obstacle")){
nextClass = "jumpup";
nextClass2 = "lbrideup";
nextLocation2 = nextLocation - widthOfBoard;
}else if (direction == "down" && !gridBoxes[nextLocation2].className.includes("obstacle")){
nextClass = "jumpdown";
nextClass2 = "lbridedown";
nextLocation2 = nextLocation + widthOfBoard;
}
//so it cant go over obstacles
if(gridBoxes[nextLocation2].className.includes("obstacle")){
if(direction == "left"){
gridBoxes[currentLocationOfLb].className = "lbrideleft";
return;

}
else if(direction == "right"){
gridBoxes[currentLocationOfLb].className = "lbrideright";
return;
}
else if(direction == "up"){
gridBoxes[currentLocationOfLb].className = "lbrideup";
return;
}
else if(direction == "down"){
gridBoxes[currentLocationOfLb].className = "lbridedown";
return;
}

}


//show lb jumping
gridBoxes[nextLocation].className = nextClass;
canMove = false;

setTimeout(function(){
//set jump back to just a fence
gridBoxes[nextLocation].className = oldClassName;

//update current location of lb to be 2 spaces past take off
currentLocationOfLb = nextLocation2;
console.log("updating current location " + currentLocationOfLb);

//get class of box after jump
nextClass = gridBoxes[currentLocationOfLb].className;


//show lb and rider after landing
 gridBoxes[currentLocationOfLb].className = nextClass2;
 canMove = true;
 console.log("Animation updating div " + currentLocationOfLb + " to " + nextClass2 + nextClass);
//if new box is target go up a level
levelUp(nextClass);
}, 350);
return;
}//if rider on

}//if class has a fence

//if there is a rider add rider
if(nextClass == "rider"){
riderOn = true;
}



//if its wing and you have rider add wing
if(nextClass == "wing"){
wing = true;
}








//if there is a bridge in the old location keep it
if(oldClassName.includes("bridge")){
gridBoxes[oldLocation].className = "bridge";
}else {
gridBoxes[oldLocation].className = "";
}//else

//build name of new class
newClass = (riderOn) ? "lbride" : "lb";
newClass += direction;
if(riderOn){
	newClass = (wing) ? "lbridewing" : "lbride";
	newClass += direction;

}



//if there is a bridge in the nexct location keep it
if(gridBoxes[nextLocation].classList.contains("bridge")){
newClass += " bridge";
}


//move 1 spaces
if(!nextClass.includes("hurdle")){
currentLocationOfLb = nextLocation;
gridBoxes[currentLocationOfLb].className = newClass;
console.log("updating div " + currentLocationOfLb + " to " + newClass);
}

//if its an enemy
if(nextClass.includes("enemy" )){
document.getElementById("lose").style.display = "block";
dead = true;
canMove = false
return;
}

//move up to next level if needed
levelUp(nextClass);


}//try to move
function timer(time) {
let timerAnimation;
let runit = currentLevel;
    //reset timer
if (time == -1) {
        document.getElementById("timer").innerHTML = "";
        clearTimeout(timerAnimation);
return;
}//if
    //time up
    if (time <= 0) {
        document.getElementById("timer").innerHTML = "0";
        document.getElementById("lose").style.display = "block";
dead = true;
canMove = false
        clearTimeout(timer);
        return;
    }//if

    //display
    document.getElementById("timer").innerHTML = "Time: " + Math.ceil(time);

    //repeat
    timerAnimation = setTimeout(function() {

if(runit != currentLevel){
time = -1;
return;
}


            timer(time - 0.05);


    }, 50);//repeat

}//timer

//move up a level
function levelUp(nextClass){

if(nextClass == "target" && riderOn){
currentLevel++;
wing = false;

canMove = false;
if(currentLevel <=4){

document.getElementById("levelup").style.display = "block";
clearTimeout(currentAnimation);
setTimeout(function(){
document.getElementById("levelup").style.display = "none";


loadLevel();
},2000);
}else{
document.getElementById("gameOver").style.display = "block";
canMove = false;
dead = true;
return;
}





}
}

//load levels 0 - max level
function loadLevel(){
let levelMap = levels[currentLevel];
let animateBoxes;
riderOn =false;
canMove = true;
time = 15;
timer(time);

//load board
console.log("currentLevel:");
console.log(currentLevel);
for(i =0;i<gridBoxes.length; i++){
gridBoxes[i].className = levelMap[i];
if(levelMap[i].includes("lb")){
currentLocationOfLb = i;
}
}//for
animateBoxes = document.querySelectorAll(".animate");

animateEnemy(animateBoxes, 0,"right");
}
//animate enemy left right
function animateEnemy(boxes,index,direction){


//exit if  no animation
if(boxes.length <=0){
return;
}
if (dead == true){
return;
}
//update images
if(direction == "right"){
boxes[index].classList.add("enemyright");
}else{
boxes[index].classList.add("enemyleft");
}

//remove images from other boxes
for( i =0; i <boxes.length;i++){
if(i != index){
boxes[i].classList.remove("enemyleft");
boxes[i].classList.remove("enemyright");
}
}
//moving right
if(direction == "right"){
//turn around if hit right side
if(index == boxes.length -1){
index--;
direction = "left";
}else{
index++;
}
//moving left
}else{
//turn around if hit right side
if(index == 0){
index++;
direction = "right";
}else{
index--;
}//else
}//else
currentAnimation = setTimeout(function(){
animateEnemy(boxes, index, direction);

},750);
var nextClass = gridBoxes[currentLocationOfLb].className;
 if (nextClass.includes("enemy")) {
        document.getElementById("lose").style.display = "block";
dead = true;
canMove = false;
return;
       
 }


}//animateEnemy
