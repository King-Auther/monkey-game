var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup;
var score,food_score;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}
function setup() {
  createCanvas(600,400)   
  ground=createSprite(300,390,600,10)
 ground.velocityX=-4;
  
  
 monkey=createSprite(50,300,10,10);
monkey.addAnimation("running",monkey_running) 
monkey.scale=0.15;

  
  score=1;
  food_score=1;
  obstacleGroup=createGroup()
  foodGroup=createGroup()
  monkey.setCollider("circle",0,0,180);
  monkey.debug = true
}


function draw() {
  background("White")
  monkey.collide(ground)
  if(gameState===PLAY){

  text("survival time: "+ score, 300,50);
    text("score" + food_score, 400,50);
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  score = score + Math.round(getFrameRate()/60);
  if(monkey.isTouching(foodGroup)){
    food_score=food_score+1;
    foodGroup.destroyEach()
  }
  if(keyDown("space")&& monkey.y >= 289) {
        monkey.velocityY = -17;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
    fruit()
  obsti()
  }
  
  
  if(monkey.isTouching(obstacleGroup)){
     gameState=END
     ground.velocityX=0
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    monkey.velocityY=0;
    
  }
  
  drawSprites()
}

function obsti(){
  if (frameCount % 120 === 0){
   var obstacle = createSprite(400,350,10,40);
    obstacle.velocityX =-4
  obstacleImage = loadImage("obstacle.png");
    obstacle.addImage(obstacleImage)
    obstacle.scale=0.2 ;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle)
    
}
}

function fruit(){
  if (frameCount % 60 === 0){
    banana = createSprite(500,200,10,10)
    banana.addImage(bananaImage)
    banana.scale=0.1;
    banana.velocityX=-4
    banana.lifetime =200;
    foodGroup.add(banana)
  }
}






