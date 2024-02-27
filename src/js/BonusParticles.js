import * as THREE from 'three';
import {pinkMat, greenMat} from './Material';
import { gsap } from 'gsap';
BonusParticles = function(){
    this.mesh = new THREE.Group();
    var bigParticleGeom = new THREE.BoxGeometry(10,10,10,1);
    var smallParticleGeom = new THREE.BoxGeometry(5,5,5,1);
    this.parts = [];
    for (var i=0; i<10; i++){
      var partPink = new THREE.Mesh(bigParticleGeom, pinkMat);
      var partGreen = new THREE.Mesh(smallParticleGeom, greenMat);
      partGreen.scale.set(.5,.5,.5);
      this.parts.push(partPink);
      this.parts.push(partGreen);
      this.mesh.add(partPink);
      this.mesh.add(partGreen);
    }
}
  
BonusParticles.prototype.explose = function(){
    var _this = this;
    var explosionSpeed = .5;
    for(var i=0; i<this.parts.length; i++){
        var tx = -50 + Math.random()*100;
        var ty = -50 + Math.random()*100;
        var tz = -50 + Math.random()*100;
        var p = this.parts[i];
        p.position.set(0,0,0);
        p.scale.set(1,1,1);
        p.visible = true;
        var s = explosionSpeed + Math.random()*.5;
        gsap.to(p.position, s,{x:tx, y:ty, z:tz, ease:"Power4.easeOut"});
        gsap.to(p.scale, s,{x:.01, y:.01, z:.01, ease:"Power4.easeOut", onComplete:removeParticle, onCompleteParams:[p]});
    }
}
  
function removeParticle(p){
    p.visible = false;
}
export default BonusParticles;
  