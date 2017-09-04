// Rover Object Goes Here
/* Rover Properties: id, direction, coordinates x and y,
<array> travelLog and boolean "moving"*/
// ======================
var rover = {
  id: null,
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [],
  moving: true
};
//=======================
// Array field; (R)over, (O)bstacle
//=======================
var field = [
  ["R", null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null]
];
//Function for show actual field
function showField(){
  var nullPos = "[*]";
  for(var x = 0; x < field.length; x ++){
    console.log(field[x] + "\n");
  }
}
//=======================
//RANDOM SECTION
//=======================
//BONUS: Function for position obstacles
//As param: <integer> with number of obstacles
/*If a position is not null, the obstacle will try to position
again in other random position.*/
function rndObstacles(numObstacles){
  var n = 0;
  if(numObstacles >= 0 && numObstacles <= 20){
    while(n < numObstacles){
      var x = Math.floor(Math.random() * 9);
      var y = Math.floor(Math.random() * 9);
      if(field[x][y] === null){
        field[x][y] = "O";
        n ++;
      }
    }
  } else{
    console.error("Obstacles number wrong!!");
  }
}
//=======================
//VALIDATION SECTION
//=======================
//BONUS: Validation Object. It has 3 methods:
//Function limit: validates if rover is in limit of grid
//Function obstacle: validates if next rover movement is possible
//Function rover: validates if rover will stop
var validation = {
  //As param, the coordinate of next movement
  limit: function(singleCoordinate){
    if(singleCoordinate < 0 || singleCoordinate > 9){
      return true;
    } else{
      return false;
    }
  },
  //As param, coordinates of next tile of field
  obstacle: function(x, y){
    if(field[x][y] === "O"){
      return true;
    } else{
      return false;
    }
  },
  //As param, coordinates of next tile of field
  rover: function(x, y){
    if(field[x][y] === "R"){
      return true;
    } else{
      return false;
    }
  }
}

//BONUS: Input validation. Only the correct letters
/*If there aren't correct letters, these letters are removed
and the rover continues with the correct letters*/
function validateList(list){
  var newList = "";
  for(var x = 0; x < list.length; x ++){
      if(list[x].toLowerCase() === "f" ||
         list[x].toLowerCase() === "b" ||
         list[x].toLowerCase() === "r" ||
         list[x].toLowerCase() === "l"){
        newList += list[x].toLowerCase();
      }
  }
  console.log("Command list revised: " + newList);
  return newList;
}
//======================

//======================
//LOGS
//======================
//Function for log all actions of rovers
//As param1, receives a char or number.
//As param2, receive a value according to param1
//As param3, receive a char for position
//If there're no params, just show rover.travelLog
function logger(param1, param2, paramEx){
  var log = "";
  if(param1 === "d"){
    log = "Rover is now facing " + param2;
    rover.travelLog.push("[" + rover.direction + "]");
  } else if(param1 === "e"){
    log = "Rover in border!, jump to next action...";
  } else if(param1 === "s"){
    log = "Rover " + param2 + " is stopped!";
    rover.travelLog.push("[Stop]");
  } else if(param1 === "o"){
    log = "Obstacle!, jump to next action...";
    rover.travelLog.push("[Obstacle]");
  } else if(paramEx === "p"){
    log = "Rover is at: [" + param1 + "][" + param2 + "]";
    rover.travelLog.push("[" + rover.x + " | " + rover.y + "]");
  } else{
    log = rover.travelLog;
  }
  console.log(log);
}
//======================

//======================
//MOVEMENT SECTION
//======================
//Function for turn left the rover
//As param, receive an Object item
function turnLeft(rover){
  //Case for each direction
  switch(rover.direction){
      case("N"):{
        rover.direction = "W";
        logger("d", "West",);
        break;
      }
      case("W"):{
        rover.direction = "S";
        logger("d", "South",);
        break;
      }
      case("S"):{
        rover.direction = "E";
        logger("d", "East",);
        break;
      }
      case("E"):{
        rover.direction = "N";
        logger("d", "North",);
        break;
      }
  }
  //----------------------
}

//Function for turn right the rover
//As param, receive an Object item
function turnRight(rover){
  //Case for each direction
  switch(rover.direction){
    case("N"):{
      rover.direction = "E";
      logger("d", "East",);
      break;
    }
    case("E"):{
      rover.direction = "S";
      logger("d", "South",);
      break;
    }
    case("S"):{
      rover.direction = "W";
      logger("d", "West",);
      break;
    }
    case("W"):{
      rover.direction = "N";
      logger("d", "North",);
      break;
    }
  }
  //-----------------------
}

//Function for move forward the rover
//As param, receive an Object item
function moveForward(rover){
  //Case for movement from where It's facing
  /*In each case we call to function <outOfLimits>, this function
  check if the rover is at limit of the grid*/
  switch(rover.direction){
    case("N"):{
      if(validation.limit(rover.y -1) === false){
        rover.y -=1;
      } else{
        logger("e");
      }
      break;
    }
    case("E"):{
      if(validation.limit(rover.y +1) === false){
        rover.x +=1;
      } else{
        logger("e");
      }
      break;
    }
    case("S"):{
      if(validation.limit(rover.y +1) === false){
        rover.y +=1;
      } else{
        logger("e");
      }
      break;
    }
    case("W"):{
      if(validation.limit(rover.x -1) === false){
        rover.x -=1;
      } else{
        logger("e");
      }
      break;
    }
  }
  //Print rover position
  logger(rover.x, rover.y, "p");
}

//BONUS. Function for moving rover backward
/*As param, receive an item Object
/*This function is equal to <moveForward> function, but in each
movement the direction is inverse*/
function moveBackward(rover){
  //Case for movement from where It's facing
  /*In each case we call to function <outOfLimits>, this function
  check if the rover is at limit of the grid*/
  switch(rover.direction){
    case("N"):{
      if(validation.limit(rover.y +1) === false){
        rover.y +=1;
      } else{
        logger("e");
      }
      break;
    }
    case("E"):{
      if(validation.limit(rover.x -1) === false){
        rover.x -=1;
      } else{
        logger("e");
      }
      break;
    }
    case("S"):{
      if(validation.limit(rover.y -1) === false){
        rover.y -=1;
      } else{
        logger("e");
      }
      break;
    }
    case("W"):{
      if(validation.limit(rover.x +1) === false){
        rover.x +=1;
      } else{
        logger("e");
      }
      break;
    }
  }
  //-------------------------
  //Print rover position
  logger(rover.x, rover.y, "p");
}
//======================

//======================
//COMMAND LIST SECTION
//======================
//Function for read a list of commands for move the rover
/*As param, receive a STRING <list> with first letter of each order:
(f)orward, (r)ight or (l)eft*/
function commandList(list){
  //Declare and initialize local variables
  var index = 0;
  var letter = "";
  //List validation and update the list
  list = validateList(list);
  //Loop for each order of the list
  while(index < list.length){
    //If rover.moving is <true>, it will iterate
    if(rover.moving === true){
      letter = list.charAt(index);
      //Case for call movement functions
      switch(letter){
        case("f"):{
          moveForward(rover);
          break;
        }
        case("r"):{
          turnRight(rover);
          break;
        }
        case("l"):{
          turnLeft(rover);
          break;
        }
        case("b"):{
          moveBackward(rover);
          break;
        }
      }
      index ++;
    }
  }
//Print rover's position log
logger();
}

//Proof for commit
