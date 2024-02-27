import * as THREE from 'three';
var floorRadius = 200;
var PI = Math.PI;
//Đéo có j ngoài nửa hình cầu xanh lá cây dưới chân 
Floor = function () {
    
    this.floorShadow = new THREE.Mesh(new THREE.SphereGeometry(floorRadius, 50, 50), new THREE.MeshPhongMaterial({
        color: 0x7abf8e,
        specular:0x000000,
        shininess:1,
        transparent:true,
        opacity:.5
      }));
  
      //floorShadow.rotation.x = -PI / 2;
      this.floorShadow.receiveShadow = true;
      
      this.floorGrass = new THREE.Mesh(new THREE.SphereGeometry(floorRadius-.5, 50, 50), new THREE.MeshBasicMaterial({
        color: 0x7abf8e
      }));
  
      //floor.rotation.x = -PI / 2;
      this.floorGrass.receiveShadow = false;
      
      this.floor = new THREE.Group();
      this.floor.position.y = -floorRadius;
      
      this.floor.add(this.floorShadow);
      this.floor.add(this.floorGrass);
}

Floor.prototype.updateFloorRotation = function (floorRotation, speed, delta){
  floorRotation += delta*.03 * speed;
  floorRotation = floorRotation%(PI*2);
  this.floor.rotation.z = floorRotation;
  return floorRotation;
}
Floor.prototype.add = function (obj){
    this.floor.add(obj);
}
export default Floor;