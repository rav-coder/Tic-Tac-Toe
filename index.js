
// constants for the shape type
const CIRCLE = 'o';
const CROSS = 'x';

// // get all the 9 canvases/boxes present in the board
// const canvasItems = document.querySelectorAll(".canvas-data")
// console.log(canvasItems);
// const canvasItems = document.querySelectorAll('div')
var canvasItems;

// conditions that need to be fulfilled to win the game
const GAME_WIN_CONDITION = [
  [0, 3, 6],
  [0, 1, 2], // when the same shape is drawn on the first three horizontal canvases
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
]

//holds the number of shapes drawn by the players
let totalDrawnShapes = 0;

//boolean for checking if the current shape is a cross
let crossCurrentShape

/**
 * Holds the blueprint for board that needs a single instance.
 */
class BoardSingleton {

  /**
   * 
   * @returns creates and returns only one instance
   */
  constructor() {
      const instance = this.constructor.instance;
      
      if (instance) {
          return instance;
      }

      this.constructor.instance = this;
  }

  /**
   * Creates some elements seen on the page including some attrributes for a board.
   */
  drawBoard() {
    // create the div element and apply some styles to it
    var footerText = document.createElement("div");
    footerText.style.paddingTop = "10px";
    footerText.style.textAlign = "center";
    footerText.style.fontSize = "18px";

    //get the date and time the game loaded
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    //add the footer text to a paragraph element and add it to the div and add div to the body
    var footer = document.createElement("p");
    var text = document.createTextNode("Game Loaded on: " + date + " " + time);
    footer.appendChild(text);
    footerText.appendChild(footer);
    document.getElementsByTagName("body")[0].appendChild(footerText);

    // create board and box elements and append box to the board
    var board = document.createElement("div");
    board.setAttribute("id", "board");
    board.classList.add("board");
    var box;
    var canvas;
    // var canvasClose = "</canvas>";

    for (var x=0; x<9; x++) {
      var string = "canvas" + x;
      box = document.createElement("box");
      box.classList.add("box");
      board.appendChild(box);

      canvas = document.createElement("canvas");
      canvas.classList.add("canvas-data");
      canvas.setAttribute("id", string);
      canvas.style.height="100px";
      canvas.style.width="100px";
      
      box.appendChild(canvas);
    }

    document.getElementsByTagName("body")[0].appendChild(board);

    //display the board and add some custom css attributes
    if(document.getElementById("board")){
      var board = document.getElementById("board");
      // board = document.getElementById("board");
      board.style.paddingTop = "20px";
      board.style.paddingBottom = "20px";
      board.style.visibility = "visible";
    }

  }
}


/**
 * Holds the blueprint for a shape.
 */
class Shape{

  /**
   * Get a associated canvas and 2d context to draw a shape.
   * 
   * @param {*} canvasId associated canvas with the id tag
   */
  constructor(canvasId){
      this.canvas = document.getElementById(canvasId);
      this.context = this.canvas.getContext("2d");
  }

  /**
   * Assign necessary attributes before drawing a shape. 
   */
  begin(){
    this.context.beginPath();
    this.context.strokeStyle = 'firebrick';
    this.context.lineWidth = 8;
  }

  /**
   * End the drawing of a shape
   */
  end(){
    this.context.stroke();
  }

}

/**
 * Holds blueprint for a cross 'X' which is a type of shape.
 */
class Cross extends Shape{
  
  /**
   * Get a associated canvas to draw a cross and call the parent Shape constructor.
   * 
   * @param {*} canvasId associated canvas with the id tag
   */
  constructor(canvasId){
    super(canvasId)
  }

  /**
   * Draw the cross shape using two lines by specifying the start and end coordinates for a line.
   */
  draw(){

    //Call the parent begin method before drawing and end method after drawing.
    super.begin();

    //make a line from top left to bottom right
    this.context.moveTo(20, 20);
    this.context.lineTo(80, 80);
    super.end();

    super.begin();

    //make a line from top right to bottom left
    this.context.moveTo(20, 80);
    this.context.lineTo(80, 20);
    super.end();
  }

}

/**
 * Holds the blueprint for circle 'O' which is a type of shape.
 */
class Circle extends Shape{

 /**
   * Get a associated canvas to draw a circle and call the parent Shape constructor.
   * 
   * @param {*} canvasId associated canvas with the id tag
   */
  constructor(canvasId){
    super(canvasId)
  }

  /**
   * Draw a circle specifying coordinates and 2 pi representing a full circle
   */
  draw(){
    super.begin();
    this.context.arc(50, 50, 35, 0, 2 * Math.PI);
    super.end();
  }

}

loadGame()

function loadGame(){

  // call the singleton board class to draw the board
  (new BoardSingleton()).drawBoard();
  
  canvasItems = document.querySelectorAll(".canvas-data")
  console.log(canvasItems);
  //reset total drawn shapes
  totalDrawnShapes = 0;

  // set the current shape to be circle when the game loads
  crossCurrentShape = false

  // select a single canvas from the 9 canvases above
  canvasItems.forEach(canvas => {

    // add and event when a canvas is clicked. only be able to click the same canvas once
    canvas.addEventListener('click', handleClick, { once: true })
  })
}


// runs after a canvas/box is clicked
function handleClick(e) {
  
  // make the current canvas the target
  const canvas = e.target

  // select the correct shape based on turn (cross and circle's turn interchanging)
  let currentShape = '';
  if(crossCurrentShape) currentShape = CROSS;
  else currentShape = CIRCLE;

  // send the current canvas and shape information
  addShape(canvas, currentShape)

  var msg = document.getElementById("msg");

  // game win or draw condition
  if(gameWon(currentShape)){
    console.log("win");

    // display win message
    if(crossCurrentShape) msg.innerText = 'X Wins!'
    else msg.innerText = 'O Wins!'

    // disable click event on the board after win
    document.getElementById('board').style.pointerEvents = 'none';
    
  } else if (gameDrawn()){
    console.log("draw");

    // display draw message
    msg.innerText = 'Draw!'
  } else{

    // display the corresponding players turn
    if(crossCurrentShape) msg.innerText = 'O turn'
    else msg.innerText = 'X turn'

  }

  // when a new canvas is clicked switch the shapes
  switchShape()

}

function addShape(canvas, currentShape){
  
  //draw the correct shape on the clicked canvas
  if(currentShape == CIRCLE){

    const shape = new Circle(canvas.id);

    if(shape instanceof Circle)
      shape.draw();
    
    // add the class name 'o' on the selected canvas
    canvas.classList.add(CIRCLE)
    
    //increment the total number of shapes drawn
    totalDrawnShapes++;
  }
  else if(currentShape == CROSS){
    const shape = new Cross(canvas.id);

    if(shape instanceof Cross)
      shape.draw();

      // add the class name 'x' on the selected canvas
      canvas.classList.add(CROSS)

      //increment the total number of shapes drawn
      totalDrawnShapes++;
  }
  else{
    console.log("Invalid shape to draw");
    return 0;
  }
  
}

function gameWon(currentShape){
    
  // loop all the win patterns specified in the array to see if the current pattern matches
  return GAME_WIN_CONDITION.some(winPattern => {

    // loop the indexes for a win pattern
    return winPattern.every(index => {

      // check if the current indexes have the same shape for the win pattern
      // check if the winning indexes contain the class name of either all 'o' or 'x'
      return canvasItems[index].classList.contains(currentShape)
    })
  })
}

function gameDrawn(){

  // if all 9 canvases have been filled, the game is drawn
  if(totalDrawnShapes == 9){
    return true;
  }
  else return false;
}

// switch the current shape
function switchShape(){
  crossCurrentShape = !crossCurrentShape;
}