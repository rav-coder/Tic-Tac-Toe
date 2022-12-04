

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
 *  asdfadsf
 * @param {*} a dsaf
 * @param {*} b asdf
 * @returns adsf
 */
function sum(a, b) {
  return a + b;
}

module.exports = sum;