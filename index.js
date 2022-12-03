
// constants for the shape type
const CIRCLE = 'o';
const CROSS = 'x';

// constant for the total box/canvas for a tic tac toe game
const totalNeededShapes = 9;

var canvasItems;

// conditions that need to be fulfilled to win the game
const GAME_WIN_CONDITION = [
  [0, 3, 6], // left column win condition
  [0, 1, 2], // top row win condition
  [0, 4, 8], // diagonal from top left to bottom right win condition
  [1, 4, 7], // middle column win condition
  [2, 5, 8], // right column win condition
  [2, 4, 6], // diagonal from top right to bottom left win condition
  [3, 4, 5], // middle row win condition
  [6, 7, 8], // bottom row win condition
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
   * Create a board for the tic-tac-toe game.
   * 
   * @returns returns only one instance of board
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
  drawBoard(totalNeededShapes) {

    // create board and box elements and append box to the board
    var board = document.createElement("div");
    board.setAttribute("id", "board");
    board.classList.add("board");
    board.style.paddingTop = "20px";
    board.style.paddingBottom = "20px";
    var box;
    var canvas;

    // loop to create 9 canvas and apend them to each box
    for (var x=0; x<totalNeededShapes; x++) {
      var string = "canvas" + x;
      box = document.createElement("div");
      box.classList.add("box");
      board.appendChild(box);

      canvas = document.createElement("canvas");
      canvas.classList.add("canvas-data");
      canvas.setAttribute("id", string);
      canvas.height="100";
      canvas.width="100";
      
      box.appendChild(canvas);
    }

    // display the board by adding it a div in the body of the html
    if(document.getElementById("board-wrap"))
      document.getElementById("board-wrap").appendChild(board);

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

/**
 * Loads the board for the game and adds mouse click event to a box
 */
function loadGame(){

  // call the singleton board class to draw the board
  (new BoardSingleton()).drawBoard(totalNeededShapes);
  
  canvasItems = document.querySelectorAll(".canvas-data")

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


/**
 * Runs after a canvas/box is clicked
 * 
 * @param {*} e event associated with a click
 */
function handleClick(e) {
  
  if(e != null){
    // make the current canvas the target
    const canvas = e.target

    // select the correct shape based on turn (cross and circle's turn interchanging)
    let currentShape = '';
    if(crossCurrentShape) currentShape = CROSS;
    else currentShape = CIRCLE;

    // send the current canvas and shape information
    addShape(canvas, currentShape)

    var msg = document.getElementById("msg");

    /* istanbul ignore next */
    // game win or draw condition
    if(gameWon(currentShape, canvasItems)){
      console.log("win");

      // display win message
      if(crossCurrentShape) msg.innerText = 'X Wins!'
      else msg.innerText = 'O Wins!'

      // disable click event on the board after win
      document.getElementById('board').style.pointerEvents = 'none';
      
    } 
    else if (gameDrawn(totalDrawnShapes)){
      console.log("draw");

      // display draw message
      msg.innerText = 'Draw!'
    } 
    
    //if game neither won or drawn, the game is ongoing
    else{
      // display the corresponding players turn
      if(crossCurrentShape) msg.innerText = 'O turn'
      else msg.innerText = 'X turn'

    }

    // when a new canvas is clicked switch the shapes
    crossCurrentShape = switchShape(crossCurrentShape)
  }
  else return 0;

}


/**
 * Display a circle or a cross on a new canvas that is clicked
 * 
 * @param {*} canvas the new canvas clicked on
 * @param {*} currentShape the shape for the current turn
 * @returns 0 if an invalid shape is found
 */
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
  // error handling in case the shape cannot be made
  else{
    //console.log("Invalid shape to draw");
    return 0;
  }
  
}

/**
 * Determine if the game is won 
 * 
 * @param {*} currentShape the shape for the current turn
 * @param {*} canvasItems the array containing the canvases
 * 
 * @returns true if game is won, false if no winner
 */
function gameWon(currentShape, canvasItems){
    
  if(canvasItems){
      // loop all the win patterns specified in the array to see if the current pattern matches
    return GAME_WIN_CONDITION.some(winPattern => {

      // loop the indexes for a win pattern
      return winPattern.every(index => {

        // check if the current indexes have the same shape for the win pattern
        // check if the winning indexes contain the class name of either all 'o' or 'x'
        return canvasItems[index].classList.contains(currentShape);
      })
    })
  }

}

/**
 * Determine if the game ends in a draw.
 * 
 * @param {*} totalDrawnShapes total number of boxes currenttly filled
 * 
 * @returns true if game is drawn, false otherwise
 */
function gameDrawn(totalDrawnShapes){

  // if all 9 canvases have been filled, the game is drawn
  if(totalDrawnShapes == totalNeededShapes){
    return true;
  }
  
  else return false;
}

/**
 * Switch the current shape.
 * 
 * @param {*} crossCurrentShape holds boolean for the current shape if cross
 * 
 * @returns the opposite T/F condition for a given state of a boolean
 */
function switchShape(crossCurrentShape){
  return !crossCurrentShape;
}

/**
 * export classes and methods for testing
 */
module.exports ={ BoardSingleton, Shape, Cross, Circle, loadGame ,handleClick, addShape, gameWon, gameDrawn, switchShape}