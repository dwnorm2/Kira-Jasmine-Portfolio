import { GLTFLoader } from "./GLTFLoader.js";
import { OrbitControls } from "./OrbitControls.js";

var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
var container = document.getElementById("canvas-container2");
var w = container.offsetWidth;
var h = container.offsetHeight;
renderer.setSize(w, h);
container.appendChild(renderer.domElement);
// document.body.appendChild(renderer.domElement);
var camera = new THREE.PerspectiveCamera(75, w / h, 0.01, 1000);
camera.aspect = w / h;

var loader = new GLTFLoader();

var obj;
// const metalTexture = new THREE.TextureLoader().load(
//   "./3d-model/Metal_006_SD/Metal_006_ambientOcclusion.jpg"
// );
// const material = new THREE.MeshBasicMaterial({ map: metalTexture });

loader.load("./3d-model/boo1.glb", function (gltf) {
  obj = gltf.scene;
  // obj.material.map = material;
  scene.add(gltf.scene);
});

scene.background = new THREE.Color(0x000000);

// const textLoader = new THREE.TextureLoader();
// const metalTexture = new THREE.TextureLoader().load(
//   "./3d-model/Metal_006_SD/Metal_006_ambientOcclusion.jpg"
// );

// obj.map = metalTexture;

//resize window function
// window.addEventListener("resize", onWindowResize, false);
// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   render();
// }

// various lights
// // var light = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
// var light = new THREE.AmbientLight(0xffffff);
// scene.add(light);
// scene.add(light);
// var hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
// hemiLight.position.set(0, 300, 0);
// scene.add(hemiLight);

var dirLight = new THREE.DirectionalLight(0xffffff);
dirLight.position.set(75, 5000, -75);
scene.add(dirLight);
// material.wireframe = true;

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 3);

function animate() {
  requestAnimationFrame(animate);
  //rotation causes type error?
  obj.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}
animate();
