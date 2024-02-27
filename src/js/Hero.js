import * as THREE from 'three';
import { gsap } from 'gsap';
import {blackMat,
    brownMat,
    pinkMat,
    lightBrownMat,
    whiteMat} from './Material';

var maxSpeed = 48;


Hero = function() {
    this.status = "running";
    this.runningCycle = 0;
    this.mesh = new THREE.Group();
    this.body = new THREE.Group();
    this.mesh.add(this.body);
    
    var torsoGeom = new THREE.BoxGeometry(7, 7, 10, 1);
    
    this.torso = new THREE.Mesh(torsoGeom, brownMat);
    this.torso.position.z = 0;
    this.torso.position.y = 7;
    this.torso.castShadow = true;
    this.body.add(this.torso);
    
    var pantsGeom = new THREE.BoxGeometry(9, 9, 5, 1);
    this.pants = new THREE.Mesh(pantsGeom, whiteMat);
    this.pants.position.z = -3;
    this.pants.position.y = 0;
    this.pants.castShadow = true;
    this.torso.add(this.pants);
    
    var tailGeom = new THREE.BoxGeometry(3, 3, 3, 1);
    tailGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0,0,-2));
    this.tail = new THREE.Mesh(tailGeom, lightBrownMat);
    this.tail.position.z = -4;
    this.tail.position.y = 5;
    this.tail.castShadow = true;
    this.torso.add(this.tail);
    
    this.torso.rotation.x = -Math.PI/8;
    
    var headGeom = new THREE.BoxGeometry(10, 10, 13, 1);
    
    headGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0,0,7.5));
    this.head = new THREE.Mesh(headGeom, brownMat);
    this.head.position.z = 2;
    this.head.position.y = 11;
    this.head.castShadow = true;
    this.body.add(this.head);
    
    var cheekGeom = new THREE.BoxGeometry(1, 4, 4, 1);
    this.cheekR = new THREE.Mesh(cheekGeom, pinkMat);
    this.cheekR.position.x = -5;
    this.cheekR.position.z = 7;
    this.cheekR.position.y = -2.5;
    this.cheekR.castShadow = true;
    this.head.add(this.cheekR);
    
    this.cheekL = this.cheekR.clone();
    this.cheekL.position.x = - this.cheekR.position.x;
    this.head.add(this.cheekL);
    
    
    var noseGeom = new THREE.BoxGeometry(6, 6, 3, 1);
    this.nose = new THREE.Mesh(noseGeom, lightBrownMat);
    this.nose.position.z = 13.5;
    this.nose.position.y = 2.6;
    this.nose.castShadow = true;
    this.head.add(this.nose);
    
    var mouthGeom = new THREE.BoxGeometry(4, 2, 4, 1);
    mouthGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0,0,3));
    mouthGeom.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI/12));
    this.mouth = new THREE.Mesh(mouthGeom, brownMat);
    this.mouth.position.z = 8;
    this.mouth.position.y = -4;
    this.mouth.castShadow = true;
    this.head.add(this.mouth);
    
    
    var pawFGeom = new THREE.BoxGeometry(3,3,3, 1);
    this.pawFR = new THREE.Mesh(pawFGeom, lightBrownMat);
    this.pawFR.position.x = -2;
    this.pawFR.position.z = 6;
    this.pawFR.position.y = 1.5;
    this.pawFR.castShadow = true;
    this.body.add(this.pawFR);
    
    this.pawFL = this.pawFR.clone();
    this.pawFL.position.x = - this.pawFR.position.x;
    this.pawFL.castShadow = true;
    this.body.add(this.pawFL);
    
    var pawBGeom = new THREE.BoxGeometry(3,3,6, 1);
    this.pawBL = new THREE.Mesh(pawBGeom, lightBrownMat);
    this.pawBL.position.y = 1.5;
    this.pawBL.position.z = 0;
    this.pawBL.position.x = 5;
    this.pawBL.castShadow = true;
    this.body.add(this.pawBL);
    
    this.pawBR = this.pawBL.clone();
    this.pawBR.position.x = - this.pawBL.position.x;
    this.pawBR.castShadow = true;
    this.body.add(this.pawBR);
    
    var earGeom = new THREE.BoxGeometry(7, 18, 2, 1);
    //bug
    earGeom.attributes.position.array[6 * 3] += 2;
    earGeom.attributes.position.array[6 * 3 + 2] += .5;
    // earGeom.vertices[6].x+=2;
    // earGeom.vertices[6].z+=.5;
    earGeom.attributes.position.array[7 * 3] += 2;
    earGeom.attributes.position.array[7 * 3 + 2] -= 0.5;
    // earGeom.vertices[7].x+=2;
    // earGeom.vertices[7].z-=.5;
    earGeom.attributes.position.array[2 * 3] -= 2;
    earGeom.attributes.position.array[2 * 3 + 2] -= 0.5;
    // earGeom.vertices[2].x-=2;
    // earGeom.vertices[2].z-=.5;
    earGeom.attributes.position.array[3 * 3] -= 2;
    earGeom.attributes.position.array[3 * 3 + 2] += 0.5;
    // earGeom.vertices[3].x-=2;
    // earGeom.vertices[3].z+=.5;
    earGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0,9,0));
    
    this.earL = new THREE.Mesh(earGeom, brownMat);
    this.earL.position.x = 2;
    this.earL.position.z = 2.5;
    this.earL.position.y = 5;
    this.earL.rotation.z = -Math.PI/12;
    this.earL.castShadow = true;
    this.head.add(this.earL);
    
    this.earR = this.earL.clone();
    this.earR.position.x = -this.earL.position.x;
    this.earR.rotation.z = -this.earL.rotation.z;
    this.earR.castShadow = true;
    this.head.add(this.earR);
    
    var eyeGeom = new THREE.BoxGeometry(2,4,4);
    
    this.eyeL = new THREE.Mesh(eyeGeom, whiteMat);
    this.eyeL.position.x = 5;
    this.eyeL.position.z = 5.5;
    this.eyeL.position.y = 2.9;
    this.eyeL.castShadow = true;
    this.head.add(this.eyeL);
    
    var irisGeom = new THREE.BoxGeometry(.6,2,2);
    
    this.iris = new THREE.Mesh(irisGeom, blackMat);
    this.iris.position.x = 1.2;
    this.iris.position.y = 1;
    this.iris.position.z = 1;
    this.eyeL.add(this.iris);
    
    this.eyeR = this.eyeL.clone();
    this.eyeR.children[0].position.x = -this.iris.position.x;
    
    
    this.eyeR.position.x = -this.eyeL.position.x;
    this.head.add(this.eyeR);
  
    this.body.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
}
//Tử trận 
Hero.prototype.hang = function(){
    var _this = this;
    var sp = 1;
    var ease = "power4.easeOut";
    
    gsap.killTweensOf(this.eyeL.scale);
    gsap.killTweensOf(this.eyeR.scale);
    
    this.body.rotation.x = 0;
    this.torso.rotation.x = 0;
    this.body.position.y = 0;
    this.torso.position.y = 7;
    
    gsap.to(this.mesh.rotation, sp, {y:0, ease:ease});
    gsap.to(this.mesh.position, sp, {y:-7, z:6, ease:ease});
    gsap.to(this.head.rotation, sp, {x:Math.PI/6, ease:ease, onComplete:function(){_this.nod();}});
    
    gsap.to(this.earL.rotation, sp, {x:Math.PI/3, ease:ease});
    gsap.to(this.earR.rotation, sp, {x:Math.PI/3, ease:ease});
    
    gsap.to(this.pawFL.position, sp, {y:-1, z:3, ease:ease});
    gsap.to(this.pawFR.position, sp, {y:-1, z:3, ease:ease});
    gsap.to(this.pawBL.position, sp, {y:-2, z:-3, ease:ease});
    gsap.to(this.pawBR.position, sp, {y:-2, z:-3, ease:ease});
    
    gsap.to(this.eyeL.scale, sp, {y:1, ease:ease});
    gsap.to(this.eyeR.scale, sp, {y:1, ease:ease});
}
//Hiệu ứng chuyển động của nhân vật
Hero.prototype.nod = function(){
    var _this = this;
    var sp = .5 + Math.random();
    
    // HEAD
    var tHeadRotY = -Math.PI/6 + Math.random()* Math.PI/3;
    // gsap.to(this.head.rotation, sp, {y:tHeadRotY, ease:"power4.easeInOut", onComplete:function(){_this.nod()}});
    gsap.to(this.head.rotation, {y: tHeadRotY, ease: "Power4.easeInOut", onComplete: function(){_this.nod()}, duration: sp});
    // EARS
    var tEarLRotX =  Math.PI/4 + Math.random()* Math.PI/6;
    var tEarRRotX =  Math.PI/4 + Math.random()* Math.PI/6;
    
    // gsap.to(this.earL.rotation, sp, {x:tEarLRotX, ease:"power4.easeInOut"});
    gsap.to(this.earL.rotation, {x:tEarLRotX, ease:"Power4.easeInOut", duration: sp});

    // gsap.to(this.earR.rotation, sp, {x:tEarRRotX, ease:"power4.easeInOut"});
    gsap.to(this.earR.rotation, {x:tEarRRotX, ease:"Power4.easeInOut", duration: sp});
    
    
    // PAWS BACK LEFT
    
    var tPawBLRot = Math.random()*Math.PI/2;
    var tPawBLY = -4 + Math.random()*8;
    
    // gsap.to(this.pawBL.rotation, sp/2, {x:tPawBLRot, ease:"power1.easeInOut", yoyo:true, repeat:2});
    gsap.to(this.pawBL.rotation, {x:tPawBLRot, ease:"Power1.easeInOut", yoyo:true, repeat:2, duration: sp/2});

    // gsap.to(this.pawBL.position, sp/2, {y:tPawBLY, ease:"power1.easeInOut", yoyo:true, repeat:2});
    gsap.to(this.pawBL.rotation, {x:tPawBLY, ease:"Power1.easeInOut", yoyo:true, repeat:2, duration: sp/2});
    
    // PAWS BACK RIGHT
    
    var tPawBRRot = Math.random()*Math.PI/2;
    var tPawBRY = -4 + Math.random()*8;
    // gsap.to(this.pawBR.rotation, sp/2, {x:tPawBRRot, ease:"power1.easeInOut", yoyo:true, repeat:2});
    gsap.to(this.pawBR.rotation, {x:tPawBRRot, ease:"Power1.easeInOut", yoyo:true, repeat:2, duration: sp/2});

    // gsap.to(this.pawBR.position, sp/2, {y:tPawBRY, ease:"power1.easeInOut", yoyo:true, repeat:2});
    gsap.to(this.pawBR.rotation, {x:tPawBRY, ease:"Power1.easeInOut", yoyo:true, repeat:2, duration: sp/2});
    
    // PAWS FRONT LEFT
    
    var tPawFLRot = Math.random()*Math.PI/2;
    var tPawFLY = -4 + Math.random()*8;
    
    // gsap.to(this.pawFL.rotation, sp/2, {x:tPawFLRot, ease:"power1.easeInOut", yoyo:true, repeat:2});
    gsap.to(this.pawFL.rotation, {x:tPawFLRot, ease:"Power1.easeInOut", yoyo:true, repeat:2, duration: sp/2});
    
    // gsap.to(this.pawFL.position, sp/2, {y:tPawFLY, ease:"power1.easeInOut", yoyo:true, repeat:2});
    gsap.to(this.pawFL.rotation, {x:tPawFLY, ease:"Power1.easeInOut", yoyo:true, repeat:2, duration: sp/2});
    // PAWS FRONT RIGHT
    
    var tPawFRRot = Math.random()*Math.PI/2;
    var tPawFRY = -4 + Math.random()*8;
    
    // gsap.to(this.pawFR.rotation, sp/2, {x:tPawFRRot, ease:"power1.easeInOut", yoyo:true, repeat:2});
    gsap.to(this.pawFR.rotation, {x:tPawFRRot, ease:"Power1.easeInOut", yoyo:true, repeat:2, duration: sp/2});

    // gsap.to(this.pawFR.position, sp/2, {y:tPawFRY, ease:"power1.easeInOut", yoyo:true, repeat:2});
    gsap.to(this.pawFR.rotation, {x:tPawFRY, ease:"Power1.easeInOut", yoyo:true, repeat:2, duration: sp/2});

    // MOUTH
    var tMouthRot = Math.random()*Math.PI/8;
    // gsap.to(this.mouth.rotation, sp, {x:tMouthRot, ease:"Power1.easeInOut"});
    gsap.to(this.mouth.rotation, {x:tMouthRot, ease:"Power1.easeInOut", yoyo:true, repeat:2, duration: sp});

    // IRIS
    var tIrisY = -1 + Math.random()*2;
    var tIrisZ = -1 + Math.random()*2;
    var iris1 = this.iris;
    var iris2 = this.eyeR.children[0];
    // gsap.to([iris1.position, iris2.position], sp, {y:tIrisY, z:tIrisZ, ease:"Power1.easeInOut"});
    gsap.to([iris1.position, iris2.position], {y: tIrisY, z: tIrisZ, ease: "Power1.easeInOut", duration: sp});
    //EYES
    if (Math.random()>.2) {
      // gsap.to([this.eyeR.scale, this.eyeL.scale], sp/8, {y:0, ease:"Power1.easeInOut", yoyo:true, repeat:1});
      gsap.to([this.eyeR.scale, this.eyeL.scale], {y:0, ease:"Power1.easeInOut", yoyo:true, repeat:1, duration: sp/8});
    }
    
}
Hero.prototype.run = function(delta, speed){
  this.status = "running";
  var s = Math.min(speed,maxSpeed);
  
  this.runningCycle += delta * s * .7;
  this.runningCycle = this.runningCycle % (Math.PI*2);
  var t = this.runningCycle;
  
  var amp = 4;
  var disp = .2;
  
  // BODY
  
  this.body.position.y = 6+ Math.sin(t - Math.PI/2)*amp;
  this.body.rotation.x = .2 + Math.sin(t - Math.PI/2)*amp*.1;
  
  this.torso.rotation.x =  Math.sin(t - Math.PI/2)*amp*.1;
  this.torso.position.y =  7 + Math.sin(t - Math.PI/2)*amp*.5;
  
  // MOUTH
  this.mouth.rotation.x = Math.PI/16 + Math.cos(t)*amp*.05;
  
  // HEAD
  this.head.position.z = 2 + Math.sin(t - Math.PI/2)*amp*.5;
  this.head.position.y = 8 + Math.cos(t - Math.PI/2)*amp*.7;
  this.head.rotation.x = -.2 + Math.sin(t + Math.PI)*amp*.1;
  
  // EARS
  this.earL.rotation.x = Math.cos(-Math.PI/2 + t)*(amp*.2);
  this.earR.rotation.x = Math.cos(-Math.PI/2 + .2 + t)*(amp*.3);
  
  // EYES
  this.eyeR.scale.y = this.eyeL.scale.y = .7 +  Math.abs(Math.cos(-Math.PI/4 + t*.5))*.6;
  
  // TAIL
  this.tail.rotation.x = Math.cos(Math.PI/2 + t)*amp*.3;
  
  // FRONT RIGHT PAW
  this.pawFR.position.y = 1.5 + Math.sin(t)*amp;
  this.pawFR.rotation.x = Math.cos(t ) * Math.PI/4;
  
  
  this.pawFR.position.z = 6 - Math.cos(t)*amp*2;
  
  // FRONT LEFT PAW
  
  this.pawFL.position.y = 1.5 + Math.sin(disp + t)*amp;
  this.pawFL.rotation.x = Math.cos( t ) * Math.PI/4;
  
  
  this.pawFL.position.z = 6 - Math.cos(disp+t)*amp*2;
  
  // BACK RIGHT PAW
  this.pawBR.position.y = 1.5 + Math.sin(Math.PI + t)*amp;
  this.pawBR.rotation.x = Math.cos(t + Math.PI*1.5) * Math.PI/3;
  
  
  this.pawBR.position.z = - Math.cos(Math.PI + t)*amp;
  
  // BACK LEFT PAW
  this.pawBL.position.y = 1.5 + Math.sin(Math.PI + t)*amp;
  this.pawBL.rotation.x = Math.cos(t + Math.PI *1.5) * Math.PI/3;
  
  
  this.pawBL.position.z = - Math.cos(Math.PI + t)*amp;
  
  
}

Hero.prototype.jump = function(speed){
  if (this.status == "jumping") return;
  this.status = "jumping";
  var _this = this;
  var totalSpeed = 10 / speed;
  var jumpHeight = 45;
  
  gsap.to(this.earL.rotation, totalSpeed, {x:"+=.3", ease:"Back.easeOut"});
  gsap.to(this.earR.rotation, totalSpeed, {x:"-=.3", ease:"Back.easeOut"});
  
  gsap.to(this.pawFL.rotation, totalSpeed, {x:"+=.7", ease:"Back.easeOut"});
  gsap.to(this.pawFR.rotation, totalSpeed, {x:"-=.7", ease:"Back.easeOut"});
  gsap.to(this.pawBL.rotation, totalSpeed, {x:"+=.7", ease:"Back.easeOut"});
  gsap.to(this.pawBR.rotation, totalSpeed, {x:"-=.7", ease:"Back.easeOut"});
  
  gsap.to(this.tail.rotation, totalSpeed, {x:"+=1", ease:"Back.easeOut"});
  
  gsap.to(this.mouth.rotation, totalSpeed, {x:.5, ease:"Back.easeOut"});
  
  gsap.to(this.mesh.position, totalSpeed/2, {y:jumpHeight, ease:"Power2.easeOut"});
  gsap.to(this.mesh.position, totalSpeed/2, {y:0, ease:"Power4.easeIn", delay:totalSpeed/2, onComplete: function(){
    //t = 0;
    _this.status="running";
  }});
    
}

export default Hero;