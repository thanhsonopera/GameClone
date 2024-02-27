import * as THREE from 'three';
import Trunc from './Trunc';
Tree = function(){
	this.mesh = new THREE.Object3D();
	this.trunc = new Trunc();
	this.mesh.add(this.trunc.mesh);
}
export default Tree;