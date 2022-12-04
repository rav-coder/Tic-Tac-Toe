

// constants for the shape type
const CIRCLE = 'o';
const CROSS = 'x';

// constant for the total box/canvas for a tic tac toe game
const totalNeededShapes = 9;

var canvasItems;

//holds the number of shapes drawn by the players
let totalDrawnShapes = 0;

//boolean for checking if the current shape is a cross
let crossCurrentShape

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


/**
 *  asdfadsf
 * @param {*} a dsaf
 * @param {*} b asdf
 * @returns adsf
 */
function sum(a, b) {
  return a + b;
}

module.exports = sum;