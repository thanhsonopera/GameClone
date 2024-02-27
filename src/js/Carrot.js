import * as THREE from 'three';
import {
    greenMat,
    pinkMat} from './Material';
//Item
Carrot = function() {
    this.angle = 0;
    this.mesh = new THREE.Group();
    
    var bodyGeom = new THREE.CylinderGeometry(5, 3, 10, 4,1);
    // bodyGeom.vertices[8].y+=2; 
    // bodyGeom.vertices[9].y-=3;
    //new replace
    for (let i = 0; i < bodyGeom.attributes.position.count; i++) {
      const vec1 = new THREE.Vector3();
      vec1.fromBufferAttribute(bodyGeom.attributes.position, i);
       if ((i == 19 || i==22 ||i==20 || i == 21)  ) {
           vec1.setY(vec1.y - 3);
           bodyGeom.attributes.position.setXYZ(i, vec1.x, vec1.y, vec1.z);
       }
      console.log(i ," ",vec1);
    }
  
    this.body = new THREE.Mesh(bodyGeom, pinkMat);
    
    var leafGeom = new THREE.BoxGeometry(5,10,1,1);
    leafGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,5,0));
    // leafGeom.vertices[2].x-=1;
    // leafGeom.vertices[3].x-=1;
    // leafGeom.vertices[6].x+=1;
    // leafGeom.vertices[7].x+=1;
  
    this.leaf1 = new THREE.Mesh(leafGeom,greenMat);
    this.leaf1.position.y = 7;
    this.leaf1.rotation.z = .3;
    this.leaf1.rotation.x = .2;
    
    this.leaf2 = this.leaf1.clone();
    this.leaf2.scale.set(1,1.3,1);
    this.leaf2.position.y = 7;
    this.leaf2.rotation.z = -.3;
    this.leaf2.rotation.x = -.2;
    
    this.mesh.add(this.body);
    this.mesh.add(this.leaf1);
    this.mesh.add(this.leaf2);
  
    this.body.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
}
export default Carrot;