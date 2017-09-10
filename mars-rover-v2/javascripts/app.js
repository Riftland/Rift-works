//==========================================
// INSTRUCTIONS
//
// 1- refillField();
// 2- roverList.push(new rover(dir, x, y, [], true)); -> (String, int, int, [], true)
// 3- posRovers();
// 4- rndObstacles(int);
// 5- showField();
// 6- commandList("String with commands");
//
// OR
//
// 1- init(numRovers, numObstacles); -> (int, int)
// 2- commandList("String with commands");
//
// Enjoy!
//==========================================

// Rover Object Goes Here
/* Rover Properties: id, direction, coordinates x and y,
<array> travelLog and boolean "moving"*/
// ======================
var defaultRover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [],
  moving: true
};
//Array for list of rovers
var roverList = [defaultRover];
//Rover builder
function rover(direction, x, y, travelLog, moving){
  this.direction = direction;
  this.x = x;
  this.y = y;
  this.travelLog = travelLog;
  this.moving = moving;
}
//=======================
// AUTO BEGINNING
//=======================
//BONUS: Function for automatize creation
//As params: param1 -> rovers number, param2 -> obstacles number
//Inner functions:
// <refillField()>: refill the field with null values
// <autoRoverBuilder()>: create random-positioned rovers
// <posRover()>: place rover objects
/* <rndObstacles()>: create random-positioned
obstacles and place them*/
// <showField()>: show the field with all
function init(numRovers, numObstacles){
  refillField();
  autoRoverBuilder(numRovers);
  posRovers();
  rndObstacles(numObstacles);
  showField();
}
//=======================
// ROVER GENERATOR
//=======================
//BONUS: function for generate 4 random-positioned rover objects
function autoRoverBuilder(numRovers){
  var init = 0;
  while (init < numRovers){
    roverList.push(new rover("", null, null, [], true));
    rndRover(roverList[roverList.length -1]);
    init ++;
  }
  for(var x = 0; x < roverList.length; x ++){
    console.log(roverList[x]);
  }
}
//=======================
// MAP SECTION
// Array field; (R)over, (O)bstacle
//=======================
var field = [[],[],[],[],[],[],[],[],[],[]];
//Loop for refill the field
function refillField(){
  for(var y = 0; y < field.length; y ++){
    for(var x = 0; x < field.length; x ++){
      field[y][x] = null;
    }
  }
}
//Function for show actual field
function showField(){
  for(var y = 0; y < field.length; y ++){
    console.log(field[y] + "\n");
  }
}
//Function for show obstacles
function showObstacles(){
  for(var x = 0; x < field.length; x ++){
    for( var y = 0; y < field.length; y ++){
      if(field[y][x] === "O"){
        console.log("Obstacle in: " + "[" + y + "|" + x +"]");
      }
    }
  }
}
//=======================
//ROVERS AND OBSTACLES
//=======================
//BONUS: Function for get random number in range 0-9
//Return the random number
function getRandomPos(){
  return Math.floor(Math.random() * 9);
}
//BONUS: Function for get random direction
//Return the random direction
function getRandomDir(){
  var direction = ["N", "E", "S", "W"];
  var id = Math.floor(Math.random() * 3);

  return direction[id];
}
//BONUS: Function for rovers position
function posRovers(){
  for(var x = 0; x < roverList.length; x ++){
    field[roverList[x].y][roverList[x].x] = "R";
  }
}
//BONUS: Function for position obstacles
//As param: <integer> with number of obstacles
/*If a position is not null, the obstacle will try to position
again in other random position.*/
function rndObstacles(numObstacles){
  var n = 0;
  if(numObstacles >= 0 && numObstacles <= 20){
    while(n < numObstacles){
      var y = getRandomPos();
      var x = getRandomPos();
      if(field[y][x] === null){
        field[y][x] = "O";
        n ++;
      }
    }
  } else{
    console.error("Obstacles number wrong!!");
  }
}
//BONUS: position randomize for rovers
//Return updated position object rover
function rndRover(rover){
  var y = getRandomPos();
  var x = getRandomPos();
  var dir = getRandomDir();

  rover.direction = dir;
  rover.x = x;
  rover.y = y;
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
  obstacle: function(y, x){
    if(field[y][x] === "O"){
      return true;
    } else{
      return false;
    }
  },
  //As param, coordinates of next tile of field
  rover: function(y, x){
    if(field[y][x] === "R"){
      return true;
    } else{
      return false;
    }
  }
};

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
//As param id, index of roverList array
//If there're no params, just show rover.travelLog
function logger(param1, param2, paramEx, id){
  var log = "";
  if(param1 === "d"){
    log = "Rover " + id + " is now facing " + param2;
    roverList[id].travelLog.push("[" + roverList[id].direction + "]");
  } else if(param1 === "e"){
    log = "Rover " + id + " in border!, jump to next action...";
  } else if(param1 === "s"){
    log = "Rover " + id + " is stopped!";
    roverList[id].travelLog.push("[Stop]");
  } else if(param1 === "o"){
    log = "Rover " + id + ": Obstacle!, jump to next action...";
    roverList[id].travelLog.push("[Obstacle]");
  } else if(paramEx === "p"){
    log = "Rover " + id + " is at: [" + param1 + "][" + param2 + "]";
    roverList[id].travelLog.push("[" + roverList[id].x + " | " + roverList[id].y + "]");
  } else{
    console.log("***ROVERS TRAVEL LOG***");
    for(var idx = 0; idx < roverList.length; idx ++){
      console.log("Rover " + idx + ": " + roverList[idx].travelLog);
    }
  }
  console.log(log);
}
//======================

//======================
//MOVEMENT SECTION
//======================
//Function for turn left the rover
//As param, receive an Object item
function turnLeft(rover, id){
  //Case for each direction
  switch(rover.direction){
      case("N"):{
        rover.direction = "W";
        logger("d", "West", null, id);
        break;
      }
      case("W"):{
        rover.direction = "S";
        logger("d", "South", null, id);
        break;
      }
      case("S"):{
        rover.direction = "E";
        logger("d", "East", null, id);
        break;
      }
      case("E"):{
        rover.direction = "N";
        logger("d", "North", null, id);
        break;
      }
  }
  //----------------------
}

//Function for turn right the rover
//As param, receive an Object item
function turnRight(rover, id){
  //Case for each direction
  switch(rover.direction){
    case("N"):{
      rover.direction = "E";
      logger("d", "East", null, id);
      break;
    }
    case("E"):{
      rover.direction = "S";
      logger("d", "South", null, id);
      break;
    }
    case("S"):{
      rover.direction = "W";
      logger("d", "West", null, id);
      break;
    }
    case("W"):{
      rover.direction = "N";
      logger("d", "North", null, id);
      break;
    }
  }
  //-----------------------
}

//Function for move forward the rover
//As param, receive an Object item
function moveForward(rover, id){
  //Case for movement from where It's facing
  /*In each case we call to function <outOfLimits>, this function
  check if the rover is at limit of the grid*/
  switch(rover.direction){
    case("N"):{
      //If out of limit
      if(validation.limit(rover.y -1) === false){
        //If obstacles
        if(validation.obstacle(rover.y -1, rover.x) === false){
          //If encounter with other rover
          if(validation.rover(rover.y -1, rover.x) === false){
            field[rover.y][rover.x] = null;
            rover.y -=1;
            field[rover.y][rover.x] = "R";
          } else{
            rover.moving = false;
            logger("s", null, null, id);
          }
        } else{
          logger("o", null, null, id);
        }
      } else{
        logger("e", null, null, id);
      }
      break;
    }
    case("E"):{
      //If out of limit
      if(validation.limit(rover.y +1) === false){
        //If obstacle
        if(validation.obstacle(rover.y, rover.x +1) === false){
          //If encounter with other rover
          if(validation.rover(rover.y, rover.x +1) === false){
            field[rover.y][rover.x] = null;
            rover.x +=1;
            field[rover.y][rover.x] = "R";
          } else{
            rover.moving = false;
            logger("s", null, null, id);
          }
        } else{
          logger("o", null, null, id);
        }
      } else{
        logger("e", null, null, id);
      }
      break;
    }
    case("S"):{
      //If out of limit
      if(validation.limit(rover.y +1) === false){
        //If obstacle
        if(validation.obstacle(rover.y +1, rover.x) === false){
          //If encounter with other rover
          if(validation.rover(rover.y +1, rover.x) === false){
            field[rover.y][rover.x] = null;
            rover.y +=1;
            field[rover.y][rover.x] = "R";
          } else{
            rover.moving = false;
            logger("s", null, null, id);
          }
        } else{
          logger("o", null, null, id);
        }
      } else{
        logger("e", null, null, id);
      }
      break;
    }
    case("W"):{
      //If out of limit
      if(validation.limit(rover.x -1) === false){
        //If obstacle
        if(validation.obstacle(rover.y, rover.x -1) === false){
          //If encounter with other rover
          if(validation.rover(rover.y, rover.x -1) === false){
            field[rover.y][rover.x] = null;
            rover.x -=1;
            field[rover.y][rover.x] = "R";
          } else{
            rover.moving = false;
            logger("s", null, null, id);
          }
        } else{
          logger("o", null, null, id);
        }
      } else{
        logger("e", null, null, id);
      }
      break;
    }
  }
  //Print rover position
  logger(rover.x, rover.y, "p", id);
}

//BONUS. Function for moving rover backward
/*As param, receive an item Object
/*This function is equal to <moveForward> function, but in each
movement the direction is inverse*/
function moveBackward(rover, id){
  //Case for movement from where It's facing
  /*In each case we call to function <outOfLimits>, this function
  check if the rover is at limit of the grid*/
  switch(rover.direction){
    case("N"):{
      //If out of limit
      if(validation.limit(rover.y +1) === false){
        //If obstacle
        if(validation.obstacle(rover.y +1, rover.x) === false){
          //If encounter with other rover
          if(validation.rover(rover.y +1, rover.x) === false){
            field[rover.y][rover.x] = null;
            rover.y +=1;
            field[rover.y][rover.x] = "R";
          } else{
            rover.moving = false;
            logger("s", null, null, id);
          }
        } else{
          logger("o", null, null, id);
        }
      } else{
        logger("e", null, null, id);
      }
      break;
    }
    case("E"):{
      //If out of limit
      if(validation.limit(rover.x -1) === false){
        //If obstacle
        if(validation.obstacle(rover.y, rover.x -1) === false){
          //If encounter with other rover
          if(validation.rover(rover.y, rover.x -1) === false){
            field[rover.y][rover.x] = null;
            rover.x -=1;
            field[rover.y][rover.x] = "R";
          } else{
            rover.moving = false;
            logger("s", null, null, id);
          }
        }
        else{
          logger("o", null, null, id);
        }
      } else{
        logger("e", null, null, id);
      }
      break;
    }
    case("S"):{
      //If out of limit
      if(validation.limit(rover.y -1) === false){
        //If obstacle
        if(validation.obstacle(rover.y -1, rover.x) === false){
          //If encounter with other rover
          if(validation.rover(rover.y -1, rover.x) === false){
            field[rover.y][rover.x] = null;
            rover.y -=1;
            field[rover.y][rover.x] = "R";
          } else{
            rover.moving = false;
            logger("s", null, null, id);
          }
        } else{
          logger("o", null, null, id);
        }
      } else{
        logger("e", null, null, id);
      }
      break;
    }
    case("W"):{
      //If out of limit
      if(validation.limit(rover.x +1) === false){
        //If obstacle
        if(validation.obstacle(rover.y, rover.x +1) === false){
          //If encounter with other rover
          if(validation.rover(rover.y, rover.x +1) === false){
            field[rover.y][rover.x] = null;
            rover.x +=1;
            field[rover.y][rover.x] = "R";
          } else{
            rover.moving = false;
            logger("s", null, null, id);
          }
        } else{
          logger("o", null, null, id);
        }
      } else{
        logger("e", null, null, id);
      }
      break;
    }
  }
  //-------------------------
  //Print rover position
  logger(rover.x, rover.y, "p", id);
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
    //Loop for iterate over rover list (rover turn for char)
    for(var id = 0; id < roverList.length; id ++){
      //If rover.moving is <true>, it will iterate
      if(roverList[id].moving === true){
        letter = list.charAt(index);
        //Case for call movement functions
        switch(letter){
          case("f"):{
            moveForward(roverList[id], id);
            break;
          }
          case("r"):{
            turnRight(roverList[id], id);
            break;
          }
          case("l"):{
            turnLeft(roverList[id], id);
            break;
          }
          case("b"):{
            moveBackward(roverList[id], id);
            break;
          }
        }
      }
    }
    index ++;
  }
//Print rover's position log
logger();
}
