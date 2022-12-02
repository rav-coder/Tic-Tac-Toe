/**
 * @jest-environment jsdom
 * 
 */

// import classes and methods from the index.js file
 const TicTacToeModule = require('./index');

 /**
  * Test for the gameWon method when win condition is met with matching pattern
  */
test('Correctly returns a win', () => {
  
  let currentShape = 'o';
  document.body.innerHTML = `
  <html lang="en" webcrx="">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <script type="text/javascript" src="index.js" defer=""></script>
    <title>Tic Tac Toe</title>
  </head>

  <body data-new-gr-c-s-check-loaded="14.1026.0" data-gr-ext-installed="">
    <div class="main-title"> Tic Tac Toe</div>
      <div id="board-wrap"><div id="board" class="board" style="padding-top: 20px; padding-bottom: 20px;">
        <div class="box"><canvas class="canvas-data o" id="canvas0" height="100" width="100"></canvas></div>
        <div class="box"><canvas class="canvas-data o" id="canvas1" height="100" width="100"></canvas></div>
        <div class="box"><canvas class="canvas-data o" id="canvas2" height="100" width="100"></canvas></div>
        <div class="box"><canvas class="canvas-data" id="canvas3" height="100" width="100"></canvas></div>
        <div class="box"><canvas class="canvas-data" id="canvas4" height="100" width="100"></canvas></div>
        <div class="box"><canvas class="canvas-data" id="canvas5" height="100" width="100"></canvas></div>
        <div class="box"><canvas class="canvas-data" id="canvas6" height="100" width="100"></canvas></div>
        <div class="box"><canvas class="canvas-data" id="canvas7" height="100" width="100"></canvas></div>
        <div class="box"><canvas class="canvas-data" id="canvas8" height="100" width="100"></canvas></div>
      </div>
    </div>

    <div style="text-align: center;">
        <div id="msg"></div>
        <button type="button" id="restart-btn" onclick="window.location.reload();"><span>Restart</span></button>
    </div>
  `

  let canvasItems = document.querySelectorAll(".canvas-data")

  //act
  expect(TicTacToeModule.gameWon(currentShape, canvasItems)).toBe(true);

  // teardown
  canvasItems = undefined;
  currentShape = undefined;

  });

/**
  * Test for the gameWon method when win condition is not met
  */
test('Correctly returns no win', () => {
  
  let currentShape = 'o';
  document.body.innerHTML = `
  <html lang="en" webcrx="">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <script type="text/javascript" src="index.js" defer=""></script>
    <title>Tic Tac Toe</title>
  </head>

  <body data-new-gr-c-s-check-loaded="14.1026.0" data-gr-ext-installed="">
    <div class="main-title"> Tic Tac Toe</div>
      <div id="board-wrap"><div id="board" class="board" style="padding-top: 20px; padding-bottom: 20px;">
        <div class="box"><canvas class="canvas-data o" id="canvas0" height="100" width="100"></canvas></div>
        <div class="box"><canvas class="canvas-data" id="canvas1" height="100" width="100"></canvas></div>
        <div class="box"><canvas class="canvas-data" id="canvas2" height="100" width="100"></canvas></div>
        <div class="box"><canvas class="canvas-data" id="canvas3" height="100" width="100"></canvas></div>
        <div class="box"><canvas class="canvas-data" id="canvas4" height="100" width="100"></canvas></div>
        <div class="box"><canvas class="canvas-data o" id="canvas5" height="100" width="100"></canvas></div>
        <div class="box"><canvas class="canvas-data" id="canvas6" height="100" width="100"></canvas></div>
        <div class="box"><canvas class="canvas-data" id="canvas7" height="100" width="100"></canvas></div>
        <div class="box"><canvas class="canvas-data o" id="canvas8" height="100" width="100"></canvas></div>
      </div>
    </div>

    <div style="text-align: center;">
        <div id="msg"></div>
        <button type="button" id="restart-btn" onclick="window.location.reload();"><span>Restart</span></button>
    </div>
  `

  let canvasItems = document.querySelectorAll(".canvas-data");

  //act
  expect(TicTacToeModule.gameWon(currentShape, canvasItems)).toBe(false);

  // teardown
  canvasItems = undefined;
  currentShape = undefined;

  });

 /**
  * Test for the switchShape method
  */
 test('Correctly switches shape', () => {
  
  //setup
  let crossCurrentShapeF = false;
  let crossCurrentShapeT = true;

  //act
  expect(TicTacToeModule.switchShape(crossCurrentShapeF)).toBe(true);
  expect(TicTacToeModule.switchShape(crossCurrentShapeF)).not.toBe(false);

  expect(TicTacToeModule.switchShape(crossCurrentShapeT)).toBe(false);
  expect(TicTacToeModule.switchShape(crossCurrentShapeT)).not.toBe(true);

  // teardown
  crossCurrentShapeF = undefined;
  crossCurrentShapeT = undefined;

 });

/**
* Test for the gameDrawn method
*/
  test('Correctly finds a draw', () => {

  //setup
  let totalDrawnShapes = 9;

  //act
  expect(TicTacToeModule.gameDrawn(totalDrawnShapes)).toBe(true);
  expect(TicTacToeModule.gameDrawn(totalDrawnShapes)).not.toBe(false);

  // teardown
  totalDrawnShapes = undefined;

  //setup
  totalDrawnShapes = 10;

  //act
  expect(TicTacToeModule.gameDrawn(totalDrawnShapes)).toBe(false);
  expect(TicTacToeModule.gameDrawn(totalDrawnShapes)).not.toBe(true);

  // teardown
  totalDrawnShapes = undefined;

  });

  /**
* Test for the addShape method
*/
test('Correctly adds a shape to a canvas', () => {

  //setup
  document.body.innerHTML = `
  <html lang="en" webcrx="">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <script type="text/javascript" src="index.js" defer=""></script>
    <title>Tic Tac Toe</title>
  </head>

  <body data-new-gr-c-s-check-loaded="14.1026.0" data-gr-ext-installed="">
    <div class="main-title"> Tic Tac Toe</div>
      <div id="board-wrap"><div id="board" class="board" style="padding-top: 20px; padding-bottom: 20px;">
        <div class="box"><canvas class="canvas-data" id="canvas0" height="100" width="100"></canvas></div>
      </div>
    </div>

    <div style="text-align: center;">
        <div id="msg"></div>
        <button type="button" id="restart-btn" onclick="window.location.reload();"><span>Restart</span></button>
    </div>
  `

  let currentShape = 'p';
  let canvas = document.getElementById("canvas0");

  //act
  expect(canvas.id).toBe("canvas0");
  expect(TicTacToeModule.addShape(canvas, currentShape)).toBe(0);

  // teardown
  canvas = undefined;
  currentShape = undefined;

  });

/**
* Test for the loadGame method
*/
test('Correctly loads', () => {

  //setup
  TicTacToeModule.loadGame();

  document.body.innerHTML = `
  <html lang="en" webcrx="">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <script type="text/javascript" src="index.js" defer=""></script>
    <title>Tic Tac Toe</title>
  </head>

  <body data-new-gr-c-s-check-loaded="14.1026.0" data-gr-ext-installed="">
    <div class="main-title"> Tic Tac Toe</div>
      <div id="board-wrap"><div id="board" class="board" style="padding-top: 20px; padding-bottom: 20px;">
        <div class="box"><canvas class="canvas-data" id="canvas0" height="100" width="100"></canvas></div>
      </div>
    </div>

    <div style="text-align: center;">
        <div id="msg"></div>
        <button type="button" id="restart-btn" onclick="window.location.reload();"><span>Restart</span></button>
    </div>
  `

  let canvas = document.getElementById("canvas");

  //arrange
  expect(TicTacToeModule.handleClick(canvas)).toBe(0);

  //teardown
  canvas = undefined;

  });


/**
* Test for the Shape, Circle and Cross classes
*/
test('Shape classes and subclasses is correctly defined.', () => {

  //setup
  document.body.innerHTML = `
  <html lang="en" webcrx="">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <script type="text/javascript" src="index.js" defer=""></script>
    <title>Tic Tac Toe</title>
  </head>

  <body data-new-gr-c-s-check-loaded="14.1026.0" data-gr-ext-installed="">
    <div class="main-title"> Tic Tac Toe</div>
      <div id="board-wrap"><div id="board" class="board" style="padding-top: 20px; padding-bottom: 20px;">
        <div class="box"><canvas class="canvas-data" id="canvas0" height="100" width="100"></canvas></div>
      </div>
    </div>

    <div style="text-align: center;">
        <div id="msg"></div>
        <button type="button" id="restart-btn" onclick="window.location.reload();"><span>Restart</span></button>
    </div>
  `
  let canvas = document.getElementById("canvas0");

  let shape1 = new TicTacToeModule.Circle(canvas.id);
  let shape2 = new TicTacToeModule.Circle(canvas.id);

  //act
  expect(shape1).toStrictEqual(shape2);
  expect(shape1).toBeInstanceOf(TicTacToeModule.Shape);

  //teardown
  shape1 = undefined;
  shape2 = undefined;

  //setup
  shape1 = new TicTacToeModule.Cross(canvas.id);
  shape2 = new TicTacToeModule.Cross(canvas.id);
  expect(shape1).toBeInstanceOf(TicTacToeModule.Shape);

  //act
  expect(shape1).toStrictEqual(shape2);

  //teardown
  shape1 = undefined;
  shape2 = undefined;

  //setup
  shape1 = new TicTacToeModule.Shape(canvas.id);
  shape2 = new TicTacToeModule.Shape(canvas.id);
  expect(shape1).toBeInstanceOf(TicTacToeModule.Shape);

  //act
  expect(shape1).toStrictEqual(shape2);

  //teardown
  shape1 = undefined;
  shape2 = undefined;

  });

/**
* Test for the BoardSingleton class
*/
test('BoardSingleton class is correctly defined.', () => {

  //setup
  var instance1 = new TicTacToeModule.BoardSingleton();
  var instance2 = new TicTacToeModule.BoardSingleton();

  //act
  expect(instance1).toBe(instance2);

  //teardown
  instance1 = undefined;
  instance2 = undefined;

  });
