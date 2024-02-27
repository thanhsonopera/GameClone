import * as THREE from 'three';
// Materials -> Phong nhằm tạo hiệu ứng bóng bẩy cho vật thể
export var blackMat = new THREE.MeshPhongMaterial({
    color: 0x100707,
    shading:THREE.FlatShading,
});
  
export var brownMat = new THREE.MeshPhongMaterial({
    color: 0xb44b39,
    // Độ bóng của vật thể
    shininess:0,
    //Tạo các hiệu ứng cắt giấy trên các bề mặt vật thể 
    shading:THREE.FlatShading,
});

export var greenMat = new THREE.MeshPhongMaterial({
    color: 0x7abf8e,
    shininess:0,
    shading:THREE.FlatShading,
});

export var pinkMat = new THREE.MeshPhongMaterial({
    color: 0xdc5f45,//0xb43b29,//0xff5b49,
    shininess:0,
    shading:THREE.FlatShading,
});

export var lightBrownMat = new THREE.MeshPhongMaterial({
    color: 0xe07a57,
    shading:THREE.FlatShading,
});

export var whiteMat = new THREE.MeshPhongMaterial({
    color: 0xa49789, 
    shading:THREE.FlatShading,
});

export var skinMat = new THREE.MeshPhongMaterial({
    color: 0xff9ea5,
    shading:THREE.FlatShading
});