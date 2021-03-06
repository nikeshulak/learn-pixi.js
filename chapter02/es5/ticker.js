//Aliases
"use strict";

var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    Sprite = PIXI.Sprite,
    Ticker = PIXI.ticker.Ticker;

//Create a Pixi stage and renderer and add the
//renderer.view to the DOM
var stage = new Container(),
    renderer = autoDetectRenderer(512, 512);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//load an image and run the `setup` function when it's done
loader.add("images/pixie96x48.png").load(setup);

//Define any variables that are used in more than one function
var pixie = undefined;

//Set the game's current state to `play`:
var state = play;

function setup() {

  //Create the `pixie` sprite
  pixie = new Sprite.fromImage("images/pixie96x48.png");

  //Position the sprite at the top left corner
  pixie.x = 0;
  pixie.y = 0;

  //Initialize the sprites's velocity variables
  pixie.vx = 0;
  pixie.vy = 0;

  //Add the sprite to the stage
  stage.addChild(pixie);

  //Start the gameLoop
  ticker = new Ticker();
  ticker.add(gameLoop);
}

function gameLoop(dt) {

  //Update the current game state:
  state();

  //Render the stage
  renderer.render(stage);
}

function play() {

  //Update the sprite's velocity
  pixie.vx = 1;
  pixie.vy = 1;

  //Apply the velocity values to the sprite's
  //position to make it move
  pixie.x += pixie.vx;
  pixie.y += pixie.vy;
}
//# sourceMappingURL=ticker.js.map