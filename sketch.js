var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterbg, shipimg, helicopterimg, bombimg;
var water, ship, helicopter, bomb;
var helicopterGroup, bombGroup;
var score = 0;
var gameOver,gameOverImg;



function preload(){
  shipimg = loadAnimation("./ship.png");
  skybg = loadImage("skybg.jpg");
  waterbg = loadImage("waterbg.png");
 
  helicopterimg = loadImage("helicopter.png");
  bombimg = loadImage("bomb.png");
  restartimg=loadAnimation("restart.png");
  sinkimg=loadAnimation("ship2.png");

  gameOverImg=loadImage("gameOver.png");
}

function setup(){
  createCanvas(800, 450);
  
  //creating water ground
  water=createSprite(400,350,800,100);
  water.addImage(waterbg);
  water.velocityX=-2;

  //creating ship
  ship=createSprite(400,300);
  ship.addAnimation("shipimg",shipimg);
  ship.addAnimation("ship",restartimg);
  ship.addAnimation("sink",sinkimg);
  ship.scale=0.5;
  
  //creating helicopter group
  helicopterGroup=new Group();

  //creating bomb group
  bombGroup=new Group();

  //ship.debug = "true";
  gameOver=createSprite(400,150);
  gameOver.addImage(gameOverImg);


}

function draw() {
  background(skybg);
  fill("yellow")
  textSize(15);
  text("USE LEFT AND RIGHT ARROWS\n TO SAVE OUR SHIP \n SURVIVAL TIME: "+ score, 500,30);
  
    
  //gameState play
  if(gameState === PLAY){
    gameOver.visible=false;
    water.velocityX=-2
    ship.changeAnimation("shipimg",shipimg)
    //increase score
    score = score + Math.round(frameCount/300);

    //Call user defined function
    spawnHelicopter();
    spawnBomb();
    if(keyDown("left"))
    {
      ship.x-=5;
    }
    if(keyDown("right"))
    {
      ship.x+=5;
    }
    if(bombGroup.isTouching(ship)){
      ship.changeAnimation("sink",sinkimg);
      gameState = END;
    }
    
  }
  
  //gameState end
  else if(gameState === END){
    gameOver.visible=true;
    ship.x=400;
    ship.y=300;
    ship.changeAnimation("ship",restartimg)
    //water velocity becomes zero
    water.velocityX=0;
    //destroy Helicopter group
    helicopterGroup.destroyEach();
    //destroy bomb group
    bombGroup.destroyEach();
    if(mousePressedOver(ship))
    {
      gameState=PLAY;
      score=0;
    }
  }
  
 
 //for infinite background 
 if(water.position.x < 300){
    water.position.x = 400;
    }
    
  
  drawSprites();
}


function spawnHelicopter(){
  if(frameCount%200 === 0){
    helicopter = createSprite(800,80,200,50);
    helicopter.addImage("helicopter",helicopterimg);
    helicopter.setVelocity(-5,0);
    helicopter.scale = 0.5;
    helicopterGroup.add(helicopter);
  }
}

function spawnBomb(){
 // create bombs at random position
 //use Math.random
 if(frameCount%200 === 0){
  bomb = createSprite(800,10,200,50);
  bomb.x=Math.round(random(50,750));
  bomb.addImage("bomb",bombimg);
  bomb.setVelocity(0,5);
  bomb.scale = 0.1;
  bombGroup.add(bomb);
}
}




