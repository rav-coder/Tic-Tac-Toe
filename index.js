

// constants for the shape type
const CIRCLE = 'o';
const CROSS = 'x';

// constant for the total box/canvas for a tic tac toe game
const totalNeededShapes = 9;

var canvasItems;

//holds the number of shapes drawn by the players
let totalDrawnShapes = 0;

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
 *  asdfadsf
 * @param {*} a dsaf
 * @param {*} b asdf
 * @returns adsf
 */
function sum(a, b) {
  return a + b;
}

module.exports = sum;