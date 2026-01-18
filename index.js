import * as THREE from "three";
import { PLYLoader } from "jsm/loaders/PLYLoader.js";

import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 2000);

camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const ctrls = new OrbitControls(camera, renderer.domElement);
ctrls.enableDamping = true;
const axesHepler = new THREE.AxesHelper(8); //do dai cua truc toa do
//scene.add(axesHepler); //ho tro tao 3 truc toa do
camera.position.set(-175, 125, -375); //mac dinh camera dc dat 000 nen can dat de nhin thay
//camera.position.set(0, 25, 80);
//khong gian vu tru
const plyLoader = new PLYLoader();

plyLoader.load("assets/model.ply", (geometry) => {
  geometry.center();

  const material = new THREE.PointsMaterial({
    size: 1,
    vertexColors: true, // su dung mau sac cua dinh
  });

  const space = new THREE.Points(geometry, material);

  space.scale.setScalar(100); // KHÔNG ĐƯỢC 5000
  scene.add(space);

  
});
const sunLight = new THREE.DirectionalLight(0xffffff, 30);
sunLight.position.set(0, 0, 0); // từ mặt trời
scene.add(sunLight);


//sun
const sunTexture = new THREE.TextureLoader().load("assets/suncyl1.jpg");
const sunGeometry = new THREE.SphereGeometry(4, 64, 64);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

//2 mercuryPlane
const textureLoader = new THREE.TextureLoader();
const envMap = textureLoader.load("assets/8k_mercury.jpg");
const mercuryPlane = new THREE.SphereGeometry(0.4, 32, 32);

const material = new THREE.MeshStandardMaterial({
  map: envMap,
});
const mercury = new THREE.Mesh(mercuryPlane, material);
scene.add(mercury);
//1 venusPlane
const VenusTexture = textureLoader.load("assets/8k_venus_surface.jpg");
const venusPlane = new THREE.SphereGeometry(0.95, 64, 64);

const venusMaterial = new THREE.MeshStandardMaterial({
  map: VenusTexture,
});
const venus = new THREE.Mesh(venusPlane, venusMaterial);
venus.position.set(5, 0, 0);
scene.add(venus);

//3 Earth
const earthTexture = textureLoader.load("assets/1_earth_8k.jpg");
const earthPlane = new THREE.SphereGeometry(1, 64, 64);
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});
const earth = new THREE.Mesh(earthPlane, earthMaterial);
earth.position.set(-5, 0, 0);
scene.add(earth);

//4 mars
const marsTexture = textureLoader.load("assets/8k_mars.jpg");
const marsPlane = new THREE.SphereGeometry(0.53, 32, 32);
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture,
});
const mars = new THREE.Mesh(marsPlane, marsMaterial);
mars.position.set(-10, 0, 0);
scene.add(mars);
//5 jupiter
const jupiterTexture = textureLoader.load("assets/8k_jupiter.jpg");
const jupiterPlane = new THREE.SphereGeometry(2.2, 64, 64);
const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: jupiterTexture,
});
const jupiter = new THREE.Mesh(jupiterPlane, jupiterMaterial);
jupiter.position.set(-15, 0, 0);
scene.add(jupiter);

//6 saturn
const saturnTexture = textureLoader.load("assets/Material.002_diffuse.jpeg");
const saturnPlane = new THREE.SphereGeometry(1.9, 64, 64);
const saturnMaterial = new THREE.MeshStandardMaterial({
  map: saturnTexture,
});
const saturn = new THREE.Mesh(saturnPlane, saturnMaterial);
scene.add(saturn);

// ring saturn
// ring saturn (texture)
const ringTexture = textureLoader.load("assets/ring_diffuse.jpeg");

const ringGeometry = new THREE.RingGeometry(1.6, 2.8, 64);
const ringMaterial = new THREE.MeshStandardMaterial({
  map: ringTexture,
  transparent: true,
  side: THREE.DoubleSide,
});
const saturnRing = new THREE.Mesh(ringGeometry, ringMaterial);

// nghiêng vành giống thật (~26.7 độ)
saturnRing.rotation.x = THREE.MathUtils.degToRad(26.7);

// gắn ring vào saturn
saturn.add(saturnRing);

//7 uranus
const uranusTexture = textureLoader.load("assets/uranusmap.jpg");
const uranusPlane = new THREE.SphereGeometry(1.4, 32, 32);
const uranusMaterial = new THREE.MeshStandardMaterial({
  map: uranusTexture,
});
const uranus = new THREE.Mesh(uranusPlane, uranusMaterial);
uranus.position.set(-20, 0, 0);
scene.add(uranus);

//8 neptune
const neptuneTexture = textureLoader.load("assets/2k_neptune.jpg");
const neptunePlane = new THREE.SphereGeometry(1.35, 32, 32);
const neptuneMaterial = new THREE.MeshStandardMaterial({
  map: neptuneTexture,
});
const neptune = new THREE.Mesh(neptunePlane, neptuneMaterial);
neptune.position.set(-25, 0, 0);
scene.add(neptune);

//=================================================================================================
//anh sang
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemiLight);

//quy dao
const mercuryRadius = 12;
const venusRadius = 17;
const earthRadius = 22;
const marsRadius = 28;
const jupiterRadius = 38;
const saturnRadius = 48;
const uranusRadius = 58;
const neptuneRadius = 68;

//toc do quay
let venusAngle = 0;
let mercuryAngle = 0;
let earthAngle = 0;
let marsAngle = 0;
let jupiterAngle = 0;
let saturnAngle = 0;
let uranusAngle = 0;
let neptuneAngle = 0;
let sunAngle = 0;
function animate() {
  requestAnimationFrame(animate);
  //tu quay
  mercury.rotation.y += 0.002;
  venus.rotation.y += 0.002;
  earth.rotation.y += 0.002;
  mars.rotation.y += 0.002;
  jupiter.rotation.y += 0.002;
  saturn.rotation.y += 0.002;
  uranus.rotation.y += 0.002;
  neptune.rotation.y += 0.002;
  sun.rotation.y += 0.002;

  //quay quanh
  venusAngle += 0.01;
  mercuryAngle += 0.02;
  earthAngle += 0.015;
  marsAngle += 0.008;
  jupiterAngle += 0.005;
  saturnAngle += 0.003;
  uranusAngle += 0.002;
  neptuneAngle += 0.001;

  //cap nhat vi tri
  neptune.position.x = neptuneRadius * Math.cos(neptuneAngle);
  neptune.position.z = neptuneRadius * Math.sin(neptuneAngle);
  neptune.position.y = 0;
  uranus.position.x = uranusRadius * Math.cos(uranusAngle);
  uranus.position.z = uranusRadius * Math.sin(uranusAngle);
  uranus.position.y = 0;
  saturn.position.x = saturnRadius * Math.cos(saturnAngle);
  saturn.position.z = saturnRadius * Math.sin(saturnAngle);
  saturn.position.y = 0;
  jupiter.position.x = jupiterRadius * Math.cos(jupiterAngle);
  jupiter.position.z = jupiterRadius * Math.sin(jupiterAngle);
  jupiter.position.y = 0;
  mars.position.x = marsRadius * Math.cos(marsAngle);
  mars.position.z = marsRadius * Math.sin(marsAngle);
  mars.position.y = 0;
  earth.position.x = earthRadius * Math.cos(earthAngle);
  earth.position.z = earthRadius * Math.sin(earthAngle);
  earth.position.y = 0;
  venus.position.x = venusRadius * Math.cos(venusAngle);
  venus.position.z = venusRadius * Math.sin(venusAngle);
  venus.position.y = 0;
  mercury.position.x = mercuryRadius * Math.cos(mercuryAngle);
  mercury.position.z = mercuryRadius * Math.sin(mercuryAngle);
  mercury.position.y = 0;
  renderer.render(scene, camera);
  ctrls.update();
}

animate();
