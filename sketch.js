//Declaring variable
var monkey, monkeyRunning;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, rockGroup;
var ground, invisibleGround;
var GameState;
var PLAY, END;

function preload() {
  //Loading animation and images
  monkeyRunning = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas( 1530,720);

  PLAY = 1;
  END = 0;
  GameState = PLAY;
  //Creating groups
  bananaGroup = new Group();
  rockGroup = new Group();
  //Creating sprites
  monkey = createSprite(70, 510, 50, 50);
  monkey.addAnimation("runningMonkey", monkeyRunning);
  monkey.scale = 0.1;

  ground = createSprite(250, 700, 2000, 400);
  ground.x = ground.width / 2;
  ground.shapeColor=("green")
  invisibleGround = createSprite(250, 510, 2000, 10);
  invisibleGround.x = ground.width / 2;
  invisibleGround.shapeColor=("green")
}


function draw() {
  //Setting background color
  background("#B3ECE8");

  if (GameState === PLAY) {

    //reset the ground it moves out of the canvas
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    //Giving jump movement for monkey
    if (keyDown("space") && monkey.isTouching(ground) ) {
      monkey.velocityY = -25;
    }  
    //Adding score
    score = Math.round(frameCount / 3);
    
    if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
monkey.scale+=0.01;


  }
  if(score>100){
    background("#F68FAB")
  }
  if(score>200){
    background("#F4D5A4")
  }
  if(score>300){
    background("#F2F7C1")
  }
  if(score>400){
    background("#78B9B3")
  }
   //Calling the functions here
   food();
   obstacle();
    //If monkey hits the rock, gamestate should change to end
    if (monkey.isTouching(rockGroup)) {


      GameState = END;
    }
} 
  
  if (GameState === END) {
    ground.velocityX = 0;
    rockGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    bananaGroup.destroyEach()
    rockGroup.destroyEach()
    ground.visible=false
    invisibleGround.visible=false
    monkey.visible=false
background("#F4B7F1")
textSize(50)
fill("purple")
text("GAMEOVER",400,300);
  }


  //Giving gravity and collide with the invisible ground
  monkey.velocityY = monkey.velocityY + 0.9;
  monkey.collide(invisibleGround);
  //Displaying the score
  stroke("black");
  textSize(40);
  fill("black");
  text("Score:" + score, 550, 50);
  
  drawSprites();
}

function food() {

  if (frameCount % 60 === 0) {
    var banana = createSprite(500, 510, 10, 20);
    banana.addImage("banana", bananaImage);
    banana.velocityX = -(5 + 2 * score / 100);
    banana.y = Math.round(random(120, 200));
    banana.scale = 0.1;
    banana.velocityX=-4
    bananaGroup.add(banana);
    bananaGroup.setLifetimeEach(100);
    banana.setCollider("rectangle", 0, 0, 400, 400);

  }

}

function obstacle() {

  if (frameCount % 200 === 0) {
    var obstacle = createSprite(500, 465, 23, 32);
    obstacle.velocityX = -(5 + 2 * score / 100);
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.2;
    rockGroup.add(obstacle);
    rockGroup.setLifetimeEach(100);
    obstacle.setCollider("circle", 0, 0, 200)
  }


}