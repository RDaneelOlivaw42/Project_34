var dog, happyDog;
var foodS, foodStock
var database;
var dogImg, happyDogImg;

function preload()
{
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  
  dog = createSprite(250, 300, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock, showError);

}

function draw() {  
background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg)
  }

  drawSprites();

  fill("white");
  stroke("white");
  text("Food Remaining : "+foodS, 100, 30);
  text("Press UP_ARROW to feed the dog", 100, 70);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  
  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }

  database.ref('/').update({
     Food:x
  })

}

function showError(){
  console.log("error");
}