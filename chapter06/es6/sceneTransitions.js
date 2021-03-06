//Aliases
let Container = PIXI.Container,
  autoDetectRenderer = PIXI.autoDetectRenderer,
  loader = PIXI.loader,
  TextureCache = PIXI.utils.TextureCache,
  Texture = PIXI.Texture,
  Sprite = PIXI.Sprite,
  Graphics = PIXI.Graphics,
  Text = PIXI.Text,
  RenderTexture = PIXI.RenderTexture,
  resources = PIXI.loader.resources,
  TilingSprite = PIXI.extras.TilingSprite;

//Create a Pixi stage and renderer
let stage = new Container(),
  renderer = autoDetectRenderer(256, 256);
document.body.appendChild(renderer.view);

//Set the canvas's border style and background color
renderer.view.style.border = "1px dashed black";
renderer.backgroundColor = "0xFFFFFF";

//Set the initial game state
let state = play;

//Define any variables that are used in more than one function
let sceneOne, sceneTwo, c;

setup();

function setup() {

  //Create a new instance of Charm
  c = new Charm();
  
  //Create scene one and scene two
  sceneOne = new Container();
  sceneTwo = new Container();
  stage.addChild(sceneOne);
  stage.addChild(sceneTwo);

  //Create sprites for scene one, and add them to the 
  //`sceneOne` container
  let blueRectangle = new Graphics();
  blueRectangle.beginFill(0x0033CC);
  blueRectangle.drawRect(0, 0, renderer.width, renderer.height);
  blueRectangle.endFill();
  sceneOne.addChild(blueRectangle);

  let sceneOneText = new Text("Scene One", {font: "32px Futura", fill: "white"});
  sceneOneText.position.set(
    blueRectangle.width / 2 - sceneOneText.width / 2,
    blueRectangle.height / 2 - sceneOneText.height / 2
  );
  sceneOne.addChild (sceneOneText);
  
  //Create sprites for scene one, and add them to the 
  //`sceneOne` container
  let redRectangle = new Graphics();
  redRectangle.beginFill(0xFF0000);
  redRectangle.drawRect(0, 0, renderer.width, renderer.height);
  redRectangle.endFill();
  sceneTwo.addChild(redRectangle);

  let sceneTwoText = new Text("Scene Two", {font: "32px Futura", fill: "white"});
  sceneTwoText.position.set(
    redRectangle.width / 2 - sceneTwoText.width / 2,
    redRectangle.height / 2 - sceneTwoText.height / 2
  );
  sceneTwo.addChild(sceneTwoText);

  //Position `sceneTwo` beyond the right edge of the canvas
  sceneTwo.x = renderer.width;

  wait(1000).then(() => {
    c.slide(sceneTwo, 0, 0);
    c.slide(sceneOne, -renderer.width, 0);
  });

  //Start the game loop
  gameLoop();
}

function gameLoop(){

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Run the current state
  state();

  //Render the stage
  renderer.render(stage);
}

function play() {

  //Update all the tweens
  c.update();
}

//The `wait` helper function
function wait(duration = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  });
}

