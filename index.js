import * as THREE from "three";
import { PLYLoader } from "jsm/loaders/PLYLoader.js";
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";

import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 2000);

camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const ctrls = new OrbitControls(camera, renderer.domElement);
ctrls.enableDamping = true;

// ctrls.addEventListener("end", () => {
//   console.log(
//     "Camera position:",
//     camera.position.x.toFixed(2),
//     camera.position.y.toFixed(2),
//     camera.position.z.toFixed(2),
//   );
//   console.log(
//     "Camera target:",
//     ctrls.target.x.toFixed(2),
//     ctrls.target.y.toFixed(2),
//     ctrls.target.z.toFixed(2),
//   );
// });
const axesHepler = new THREE.AxesHelper(750); //do dai cua truc toa do
scene.add(axesHepler); //ho tro tao 3 truc toa do
const sunSystemCameraPos = new THREE.Vector3(-228.71, 421.49, -611.3);

const sunSystemTarget = new THREE.Vector3(20.84, 71.35, 17.06);
camera.position.copy(sunSystemCameraPos);
ctrls.target.copy(sunSystemTarget);

let followPlanet = null; //ban dau se follow sun system
const CAMERA_MODE = {
  SUN_SYSTEM: "SUN_SYSTEM",
  FOLLOW: "FOLLOW",
  FREE: "FREE",
};

let cameraMode = CAMERA_MODE.SUN_SYSTEM;

camera.position.set(-228.71, 421.49, -611.3);
ctrls.target.set(20.84, 71.35, 17.06);

//camera.position.set(0, 25, 80);

// khong gian vu tru
const plyLoader = new PLYLoader();

plyLoader.load("assets/model.ply", (geometry) => {
  geometry.center();

  const material = new THREE.PointsMaterial({
    size: 1.6,
    vertexColors: true,
  });

  const space = new THREE.Points(geometry, material);
  space.scale.setScalar(195);
  scene.add(space);
});

const sunLight = new THREE.DirectionalLight(0xffffff, 3000);
sunLight.position.set(0, 0, 0); // từ mặt trời
scene.add(sunLight);

//sun
const sunTexture = new THREE.TextureLoader().load("assets/suncyl1.jpg");
const sunGeometry = new THREE.SphereGeometry(40, 640, 640);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

//2 mercuryPlane
const textureLoader = new THREE.TextureLoader();
const envMap = textureLoader.load("assets/8k_mercury.jpg");
const mercuryPlane = new THREE.SphereGeometry(4, 320, 320);

const material = new THREE.MeshStandardMaterial({
  map: envMap,
});
const mercury = new THREE.Mesh(mercuryPlane, material);
scene.add(mercury);

//1 venusPlane
const VenusTexture = textureLoader.load("assets/8k_venus_surface.jpg");
const venusPlane = new THREE.SphereGeometry(9.5, 640, 640);

const venusMaterial = new THREE.MeshStandardMaterial({
  map: VenusTexture,
});
const venus = new THREE.Mesh(venusPlane, venusMaterial);
venus.position.set(5, 0, 0);
scene.add(venus);

//3 Earth
const earthTexture = textureLoader.load("assets/1_earth_8k.jpg");
const earthPlane = new THREE.SphereGeometry(10, 640, 640);
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});
const earth = new THREE.Mesh(earthPlane, earthMaterial);
earth.position.set(-5, 0, 0);
scene.add(earth);

//4 mars
const marsTexture = textureLoader.load("assets/8k_mars.jpg");
const marsPlane = new THREE.SphereGeometry(5.3, 320, 320);
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture,
});
const mars = new THREE.Mesh(marsPlane, marsMaterial);
mars.position.set(-10, 0, 0);
scene.add(mars);
//5 jupiter
const jupiterTexture = textureLoader.load("assets/8k_jupiter.jpg");
const jupiterPlane = new THREE.SphereGeometry(22, 640, 640);
const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: jupiterTexture,
});
const jupiter = new THREE.Mesh(jupiterPlane, jupiterMaterial);
jupiter.position.set(-15, 0, 0);
scene.add(jupiter);

//6 saturn
const saturnTexture = textureLoader.load("assets/Material.002_diffuse.jpeg");
const saturnPlane = new THREE.SphereGeometry(19, 640, 640);
const saturnMaterial = new THREE.MeshStandardMaterial({
  map: saturnTexture,
});
const saturn = new THREE.Mesh(saturnPlane, saturnMaterial);
scene.add(saturn);

// ring saturn
// ring saturn (texture)
const ringTexture = textureLoader.load("assets/ring_diffuse.jpeg");

const ringGeometry = new THREE.RingGeometry(16, 28, 640);
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
const uranusPlane = new THREE.SphereGeometry(14, 320, 320);
const uranusMaterial = new THREE.MeshStandardMaterial({
  map: uranusTexture,
});
const uranus = new THREE.Mesh(uranusPlane, uranusMaterial);
uranus.position.set(-20, 0, 0);
scene.add(uranus);

//8 neptune
const neptuneTexture = textureLoader.load("assets/2k_neptune.jpg");
const neptunePlane = new THREE.SphereGeometry(13.5, 320, 320);
const neptuneMaterial = new THREE.MeshStandardMaterial({
  map: neptuneTexture,
});
const neptune = new THREE.Mesh(neptunePlane, neptuneMaterial);
neptune.position.set(-25, 0, 0);
scene.add(neptune);

//moon
const moonTexture = textureLoader.load("assets/8k_moon.jpg");
const moonPlane = new THREE.SphereGeometry(2, 320, 320);
const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
});
const moon = new THREE.Mesh(moonPlane, moonMaterial);
moon.position.set(-5, 0, 0);

const moonPivot = new THREE.Object3D();
earth.add(moonPivot);
moonPivot.rotation.z = THREE.MathUtils.degToRad(5.14);
moon.position.set(30, 0, 0); // khoảng cách Moon ↔ Earth
moonPivot.add(moon);

//iss
const issPivot = new THREE.Object3D();
earth.add(issPivot);
issPivot.rotation.x = THREE.MathUtils.degToRad(51.6);
const gltfLoader = new GLTFLoader();
let iss;
gltfLoader.load(
  "assets/ISS_stationary.glb",
  (gltf) => {
    iss = gltf.scene;

    iss.scale.setScalar(0.025);

    // khoảng cách quỹ đạo quanh Earth
    iss.position.set(18, 0, 0);

    issPivot.add(iss);
  },
  undefined,
  (error) => {
    console.error("Load ISS error:", error);
  },
);
//space ship
const shipPivot = new THREE.Object3D();
earth.add(shipPivot);
let spaceship;
const specialObjectMap = {
  Ship: () => spaceship, // dùng function vì spaceship load async
};
gltfLoader.load(
  "assets/space_ship.glb",
  (gltf) => {
    spaceship = gltf.scene;
    // const shipFillLight = new THREE.PointLight(0xffffff, 1.5, 20);
    // shipFillLight.position.set(0, 0, 0); // phía trên & trước tàu
    // spaceship.add(shipFillLight);

    spaceship.scale.setScalar(0.1); // thử 0.1 – 1
    spaceship.position.set(20, 0, 0); // khoảng cách tới Earth

    shipPivot.add(spaceship);
  },
  undefined,
  (error) => {
    console.error("Load spaceship error:", error);
  },
);

//=================================================================================================
//anh sang
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemiLight);

//quy dao
const mercuryRadius = 120;
const venusRadius = 170;
const earthRadius = 220;
const marsRadius = 280;
const jupiterRadius = 380;
const saturnRadius = 480;
const uranusRadius = 580;
const neptuneRadius = 680;

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

//camforcus thanh tinh===========================================================================

const planetMap = {
  Sun: sun,
  Mercury: mercury,
  Venus: venus,
  Earth: earth,
  Mars: mars,
  Jupiter: jupiter,
  Saturn: saturn,
  Uranus: uranus,
  Neptune: neptune,
};

function getNormalizedOffset(radius) {
  const distanceFactor = 3.5; // càng lớn → camera càng xa
  const heightFactor = 2.2; // độ cao camera
  const baseDistance = 40; // chống quá sát với hành tinh nhỏ

  return new THREE.Vector3(
    0,
    radius * heightFactor,
    radius * distanceFactor + baseDistance,
  );
}
let followOffset = getNormalizedOffset(earth.geometry.parameters.radius);

document.querySelectorAll("#planet-list div").forEach((item) => {
  item.addEventListener("click", () => {
    const name = item.innerText.trim();

    //FREE CAMERA
    if (name === "Free Camera") {
      cameraMode = CAMERA_MODE.FREE;
      followPlanet = null;
      return;
    }

    // SUN SYSTEM
    if (name === "Sun System") {
      cameraMode = CAMERA_MODE.SUN_SYSTEM;
      followPlanet = null;
      return;
    }
    //fllow olane
    const planet = planetMap[name];
    if (planet) {
      cameraMode = CAMERA_MODE.FOLLOW;
      followPlanet = planet;

      const radius = planet.geometry.parameters.radius;
      followOffset = getNormalizedOffset(radius);
    }
    //ship
    if (name === "Ship" && spaceship) {
      cameraMode = CAMERA_MODE.FOLLOW;
      followPlanet = spaceship;

      followOffset = new THREE.Vector3(0, 6, -15);
    }
  });
});

//ui bang chon
const items = document.querySelectorAll("#planet-list div");
items.forEach((item) => {
  item.addEventListener("click", () => {
    // bỏ active tất cả
    items.forEach((el) => el.classList.remove("active"));
    // active item đang chọn
    item.classList.add("active");
  });
});

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

  //ve tinh cua trai dat
  moonPivot.rotation.y += 0.00025; // tốc độ quay quanh Earth
  moon.rotation.y = -moonPivot.rotation.y;
  issPivot.rotation.y += 0.005; // tốc độ quay quanh Earth

  if (iss) {
    iss.rotation.y += 0.001;
  }

  //quay quanh
  venusAngle += 0.001;
  mercuryAngle += 0.002;
  earthAngle += 0.0015;
  marsAngle += 0.0008;
  jupiterAngle += 0.0005;
  saturnAngle += 0.0003;
  uranusAngle += 0.0002;
  neptuneAngle += 0.0001;

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

  if (cameraMode === CAMERA_MODE.FOLLOW && followPlanet) {
    const worldPos = new THREE.Vector3();
    followPlanet.getWorldPosition(worldPos);

    camera.position.lerp(worldPos.clone().add(followOffset), 0.1);
    ctrls.target.lerp(worldPos, 0.1);
  }

  if (cameraMode === CAMERA_MODE.SUN_SYSTEM) {
    camera.position.lerp(sunSystemCameraPos, 0.05);
    ctrls.target.lerp(sunSystemTarget, 0.05);
  }

  renderer.render(scene, camera);
  ctrls.update();
}

animate();
