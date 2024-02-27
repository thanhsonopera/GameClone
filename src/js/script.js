import * as THREE from 'three';
import { gsap } from 'gsap';
import Hero from './Hero';
import Monster from './Monster';
import Carrot from './Carrot';
import BonusParticles from './BonusParticles';
import Hedgehog from './Hedgehog';
import Tree from './Tree';
import Floor from './Floor';
var scene,
  camera, fieldOfView, aspectRatio, nearPlane, farPlane,
  gobalLight, shadowLight, backLight,
  renderer,
  container,
  controls, 
  clock;
var delta = 0;
var floorRadius = 200;
var obj = { speed: 6 };
var distance = 0;
var level = 1;
var levelInterval;
var levelUpdateFreq = 3000;
var initSpeed = 5;
var maxSpeed = 48;
var monsterPos = .65;
var monsterPosTarget = .65;
var floorRotation = 0;
var collisionObstacle = 10;
var collisionBonus = 20;
var gameStatus = "play";
var cameraPosGame = 160;
var cameraPosGameOver = 260;
var monsterAcceleration = 0.004;
var malusClearColor = 0xb44b39;
var malusClearAlpha = 0;
var audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/264161/Antonio-Vivaldi-Summer_01.mp3');

var fieldGameOver, fieldDistance;

//SCREEN & MOUSE VARIABLES

var HEIGHT, WIDTH, windowHalfX, windowHalfY,
  mousePos = {
    x: 0,
    y: 0
  };

//3D OBJECTS VARIABLES

var hero;
var monster;
var carrot;
var bonusParticles;
var floor
var PI = Math.PI;

function initScreenAnd3D() {

    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    windowHalfX = WIDTH / 2;
    windowHalfY = HEIGHT / 2;
  
    scene = new THREE.Scene();
    
    scene.fog = new THREE.Fog(0xd6eae6, 160, 350);
    
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 50;
    nearPlane = 1;
    farPlane = 2000;
    camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
    camera.position.x = 0;
    camera.position.z = cameraPosGame;
    camera.position.y = 30;
    //Vị trí camera nhìn về, không quan tâm đến vị trị camera hiện tại 
    camera.lookAt(new THREE.Vector3(0, 30, 0));
  
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio); 
    renderer.setClearColor( malusClearColor, malusClearAlpha);
    
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
  
    container = document.getElementById('world');
    container.appendChild(renderer.domElement);
  
    window.addEventListener('resize', handleWindowResize, false);
    document.addEventListener('mousedown', handleMouseDown, false);
    document.addEventListener("touchend", handleMouseDown, false);
  
    /*
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.minPolarAngle = -PI / 2; 
    //controls.maxPolarAngle = PI / 2;
    //controls.noZoom = true;
    controls.noPan = true;
    //*/
    
    clock = new THREE.Clock();
  
}
// Điều chỉnh khi thay đổi kích thước cửa sổ trình duyệt
function handleWindowResize() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    windowHalfX = WIDTH / 2;
    windowHalfY = HEIGHT / 2;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
}
  
function handleMouseDown(event){
  gameStatus = monster.getGameStatus();
  console.log("monster.getGameStatus", gameStatus);
  if (gameStatus == "play") hero.jump(obj.speed);
  else 
    if (gameStatus == "readyToReplay"){
      replay();
    }
}
function createFloor() {
    floor = new Floor();
    scene.add(floor.floor);
}

function createLights() {
    //Ánh sáng môi trường xung quanh 
    globalLight = new THREE.AmbientLight(0xffffff, .9);
    //Ánh sáng mặt trời
    shadowLight = new THREE.DirectionalLight(0xffffff, 1);
    shadowLight.position.set(-30, 40, 20);
    shadowLight.castShadow = true;
    //Vị trí đổ bóng của ánh sáng
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    //Khoảng cách nhìn thấy bóng 
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 2000;
    shadowLight.shadow.mapSize.width = shadowLight.shadow.mapSize.height = 2048;
  
    scene.add(globalLight);
    scene.add(shadowLight);
    
}

function createHero() {
    hero = new Hero();
    hero.mesh.rotation.y = PI/2;
    scene.add(hero.mesh);
    hero.nod();
}

function createMonster() {
  
  monster = new Monster();
  monster.mesh.position.z = -20;
  //monster.mesh.scale.set(1.2,1.2,1.2);
  scene.add(monster.mesh);
  updateMonsterPosition();
}

function updateMonsterPosition(){
  monster.run(obj.speed, delta);
  monsterPosTarget -= delta*monsterAcceleration;
  monsterPos += (monsterPosTarget-monsterPos) *delta;
  if (monsterPos < .56){
    gameOver();
  }
  
  var angle = PI*monsterPos;
  monster.mesh.position.y = - floorRadius + Math.sin(angle)*(floorRadius + 12);
  monster.mesh.position.x = Math.cos(angle)*(floorRadius+15);
  monster.mesh.rotation.z = -PI/2 + angle;
}


function createCarrot(){
  carrot = new Carrot();
  scene.add(carrot.mesh);
}
function updateCarrotPosition(){

  carrot.mesh.rotation.y += delta * 6;
  carrot.mesh.rotation.z = PI/2 - (floorRotation+carrot.angle);
  carrot.mesh.position.y = -floorRadius + Math.sin(floorRotation+carrot.angle) * (floorRadius+50);
  carrot.mesh.position.x = Math.cos(floorRotation+carrot.angle) * (floorRadius+50);
}


function createBonusParticles(){
  bonusParticles = new BonusParticles();
  bonusParticles.mesh.visible = false;
  scene.add(bonusParticles.mesh);
  
}

function createObstacle(){
  obstacle = new Hedgehog();
  obstacle.body.rotation.y = -PI/2;
  obstacle.mesh.scale.set(1.1,1.1,1.1);
  obstacle.mesh.position.y = floorRadius+4;
  obstacle.nod();
  scene.add(obstacle.mesh);
}
//Tạo vị trí 
function updateObstaclePosition(){
  if (obstacle.status=="flying")return;
  
  // TODO fix this,
  if (floorRotation+obstacle.angle > 2.5 ){
    obstacle.angle = -floorRotation + Math.random()*.3;
    obstacle.body.rotation.y = Math.random() * PI*2;
  }
  
  obstacle.mesh.rotation.z = floorRotation + obstacle.angle - PI/2;
  obstacle.mesh.position.y = -floorRadius + Math.sin(floorRotation+obstacle.angle) * (floorRadius+3);
  obstacle.mesh.position.x = Math.cos(floorRotation+obstacle.angle) * (floorRadius+3);
  
}

function checkCollision(){
  var db = hero.mesh.position.clone().sub(carrot.mesh.position.clone());
  var dm = hero.mesh.position.clone().sub(obstacle.mesh.position.clone());
  
  if(db.length() < collisionBonus){
    getBonus();
  }
  
  if(dm.length() < collisionObstacle && obstacle.status != "flying"){
     getMalus();
  }
}
//user nhận được item 
function getBonus(){
  bonusParticles.mesh.position.copy(carrot.mesh.position);
  bonusParticles.mesh.visible = true;
  bonusParticles.explose();
  carrot.angle += PI/2;
  //speed*=.95;
  monsterPosTarget += .025;
  
}
//user chạm vật cản
function getMalus(){
  obstacle.status="flying";
  var tx = (Math.random()>.5)? -20-Math.random()*10 : 20+Math.random()*5;
  gsap.to(obstacle.mesh.position, 4, {x:tx, y:Math.random()*50, z:350, ease:"Power4.easeOut"});
  gsap.to(obstacle.mesh.rotation, 4, {x:PI*3, z:PI*3, y:PI*6, ease:"Power4.easeOut", onComplete:function(){
    obstacle.status = "ready";
    obstacle.body.rotation.y = Math.random() * PI*2;
    obstacle.angle = -floorRotation - Math.random()*.4;
    
    obstacle.angle = obstacle.angle%(PI*2);
    obstacle.mesh.rotation.x = 0;
    obstacle.mesh.rotation.y = 0;
    obstacle.mesh.rotation.z = 0;
    obstacle.mesh.position.z = 0;
    
  }});
  //
  monsterPosTarget -= .04;
  gsap.from(this, .5, {malusClearAlpha:.5, onUpdate:function(){
    renderer.setClearColor(malusClearColor, malusClearAlpha );
  }})
}

function updateDistance(){
  distance += delta*obj.speed;
  var d = distance/2;
  fieldDistance.innerHTML = Math.floor(d);
}

function updateLevel(){
  if (obj.speed >= maxSpeed) return;
  level++;
  obj.speed += 2; 

}


function createFirs(){
  
  var nTrees = 100;
   for(var i=0; i< nTrees; i++){
    var phi = i*(PI*2)/nTrees;
    var theta = PI/2;
    //theta += .25 + Math.random()*.3; 
    theta += (Math.random()>.05)? .25 + Math.random()*.3 : - .35 -  Math.random()*.1;
   
    var fir = new Tree();
    fir.mesh.position.x = Math.sin(theta)*Math.cos(phi)*floorRadius;
    fir.mesh.position.y = Math.sin(theta)*Math.sin(phi)*(floorRadius-10);
    fir.mesh.position.z = Math.cos(theta)*floorRadius; 
     
    var vec = fir.mesh.position.clone();
    var axis = new THREE.Vector3(0,1,0);
    fir.mesh.quaternion.setFromUnitVectors(axis, vec.clone().normalize());
    floor.add(fir.mesh); 
  }
}

function gameOver(){

  fieldGameOver.className = "show";
  gameStatus = "gameOver";
  monster.sit(gameStatus);
  hero.hang();
  monster.heroHolder.add(hero.mesh);

  gsap.to(obj, {speed: 0, duration: 1});

  gsap.to(camera.position, 3, {z:cameraPosGameOver, y: 60, x:-30});
  carrot.mesh.visible = false;
  obstacle.mesh.visible = false;
  clearInterval(levelInterval);
}
/////////
function replay(){
  console.log("replay");
  gameStatus = "preparingToReplay"
  fieldGameOver.className = "";
  
  gsap.killTweensOf(monster.pawFL.position);
  gsap.killTweensOf(monster.pawFR.position);
  gsap.killTweensOf(monster.pawBL.position);
  gsap.killTweensOf(monster.pawBR.position);
  
  gsap.killTweensOf(monster.pawFL.rotation);
  gsap.killTweensOf(monster.pawFR.rotation);
  gsap.killTweensOf(monster.pawBL.rotation);
  gsap.killTweensOf(monster.pawBR.rotation);
  
  gsap.killTweensOf(monster.tail.rotation);
  gsap.killTweensOf(monster.head.rotation);
  gsap.killTweensOf(monster.eyeL.scale);
  gsap.killTweensOf(monster.eyeR.scale);
  
  //gsap.killTweensOf(hero.head.rotation);
  
  monster.tail.rotation.y = 0;
    
  gsap.to(camera.position, 3, {z:cameraPosGame, x:0, y:30, ease:"Power4.easeInOut"});
  gsap.to(monster.torso.rotation,2, {x:0, ease:"Power4.easeInOut"});
  gsap.to(monster.torso.position,2, {y:0, ease:"Power4.easeInOut"});
  gsap.to(monster.pawFL.rotation,2, {x:0, ease:"Power4.easeInOut"});
  gsap.to(monster.pawFR.rotation,2, {x:0, ease:"Power4.easeInOut"});
  gsap.to(monster.mouth.rotation,2, {x:.5, ease:"Power4.easeInOut"});
  
  
  gsap.to(monster.head.rotation,2, {y:0, x:-.3, ease:"Power4.easeInOut"});
  
  gsap.to(hero.mesh.position, 2, { x:20, ease:"Power4.easeInOut"});
  gsap.to(hero.head.rotation, 2, { x:0, y:0, ease:"Power4.easeInOut"});
  gsap.to(monster.mouth.rotation, 2, {x:.2, ease:"Power4.easeInOut"});
  gsap.to(monster.mouth.rotation, 1, {x:.4, ease:"Power4.easeIn", delay: 1, onComplete:function(){
  
    resetGame();
  }});
  
}
///////
function resetGame(){
  scene.add(hero.mesh);
  hero.mesh.rotation.y = PI/2;
  hero.mesh.position.y = 0;
  hero.mesh.position.z = 0;
  hero.mesh.position.x = 0;

  monsterPos = .56;
  monsterPosTarget = .65;
  obj.speed = initSpeed;
  level = 0;
  distance = 0;
  carrot.mesh.visible = true;
  obstacle.mesh.visible = true;
  gameStatus = "play";
  monster.gameStatus = "play";
  hero.status = "running";
  hero.nod();
  setTimeout(() => audio.play(), 100);
  
  updateLevel();
  levelInterval = setInterval(updateLevel, levelUpdateFreq);
}

function loop(){

    delta = clock.getDelta();
    floorRotation = floor.updateFloorRotation(floorRotation, obj.speed, delta);
    
    if (gameStatus == "play"){
      console.log(hero.status);
      if (hero.status == "running"){
        hero.run(delta, obj.speed);
      }
      updateDistance();
      updateMonsterPosition();
      updateCarrotPosition();
      updateObstaclePosition();
      checkCollision();
    }
    
    render();  
    requestAnimationFrame(loop);
}
  
function render(){
    renderer.render(scene, camera);
}

function init(event){
  initScreenAnd3D()
  createFloor()
  createLights()  
  createHero()
  createMonster()
  createCarrot()
  createBonusParticles();
  createObstacle();
  createFirs();
  initUI();
  resetGame();
  loop()
}
function initUI(){
  fieldDistance = document.getElementById("distValue");
  fieldGameOver = document.getElementById("gameoverInstructions");
  
}
window.addEventListener('load', init, false);