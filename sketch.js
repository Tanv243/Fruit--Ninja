var knife,knifeImage, fruit,fruit1Image,fruit2Image,fruit3Image,
    fruit4Image,enemy,monster,monsterImage;
var PLAY=1;
var END=0;
var gameState=1;

var fruitGroup;
var enemyGroup;
var score=0;

var gameOver,gameOverImage;
var gameoverSound,knifeSwordSound;

function preload(){
  knifeImage=loadImage("sword.png");
  fruit1Image=loadImage("fruit1.png");
    fruit2Image=loadImage("fruit2.png");
  fruit3Image=loadImage("fruit3.png");
    fruit4Image=loadImage("fruit4.png");
  monsterImage=loadImage("alien2.png");
  gameOverImage=loadImage("gameover.png");
  gameoverSound=loadSound("gameover.mp3");
  knifeSwordSound=loadSound("knifeSwooshSound.mp3");
}
function setup(){
  createCanvas(windowWidth,windowHeight); 
  knife=createSprite(width/2,height-20,20,20);
  knife.addImage(knifeImage);
  knife.scale=0.5;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
}
function draw(){
  background("pink");
  text("Score :"+score,300,30);
  if (gameState===PLAY){
    knife.x=mouseX;
  knife.y=mouseY;
  fruit();
  enemy();
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      score=score+2;
      knifeSwordSound.play();
    }
    else
      {
        if(enemyGroup.isTouching(knife)){
          gameState=END;
          fruitGroup.destroyEach();
          enemyGroup.destroyEach();
          fruitGroup.setVelocityXEach(0);
          enemyGroup.setVelocityXEach(0);
          knife.addImage(gameOverImage);
          knife.x=200;
          knife.y=200;
          gameoverSound.play();
        }
      }
  }
  
  
drawSprites();
}
function fruit(){
  if(World.frameCount%80===0){
   var fruit= createSprite(400,200,20,20);
    fruit.y=Math.round(random(50,width-50,340));
  fruit.velocityX=-7;
  fruit.setLifetime=100;
    fruit.scale=0.2;
    fruitGroup.add(fruit);
  var r=Math.round(random(1,4));
    if (r==1){
      fruit.addImage(fruit1Image);
    } else if (r==2){
       fruit.addImage(fruit2Image); 
      }else if (r==3){
        fruit.addImage(fruit3Image);
      }else {
        fruit.addImage(fruit4Image);
      }
    
    }
  
  

}
function enemy(){
  if(frameCount%200===0){
 var monster=createSprite(400,200,20,20);
    monster.addImage(monsterImage);
    monster.y=Math.round(random(width/100,300));
    monster.velocityX=-(8+2/100);
    enemyGroup.add(monster);
  }
}
