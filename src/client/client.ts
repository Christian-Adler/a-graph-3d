import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 5

// RENDERER
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// container.appendChild( renderer.domElement );
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', render) //this line is unnecessary if you are re-rendering within the animation loop

scene.background = new THREE.Color().setHSL(0.6, 0, 1);
scene.fog = new THREE.Fog(scene.background, 1, 5000);

const geometry = new THREE.BoxGeometry()
// const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true, transparent: false, opacity: 1.0})
// const material = new THREE.MeshLambertMaterial({color: 'red'}); // https://threejs.org/docs/index.html#api/en/materials/MeshLambertMaterial
const material = new THREE.MeshNormalMaterial();
// const material = new THREE.MeshPhongMaterial({ color: "gold" }); //Bessere farben fuer Glanz - aber langsamer als Lambert

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// const cube2 = new THREE.Mesh(geometry, material)
// cube2.position.y -= 2;
// cube.add(cube2)

// // LIGHT
// const dirLight = new THREE.DirectionalLight(0xffffff, 1);
// dirLight.color.setHSL(0.1, 1, 0.95);
// dirLight.position.set(-1, 1.75, 1);
// dirLight.position.multiplyScalar(30);
// scene.add(dirLight);
//
// // dirLight.castShadow = true;
// // dirLight.shadow.mapSize.width = 2048;
// // dirLight.shadow.mapSize.height = 2048;
// //
// // const d = 50;
// //
// // dirLight.shadow.camera.left = -d;
// // dirLight.shadow.camera.right = d;
// // dirLight.shadow.camera.top = d;
// // dirLight.shadow.camera.bottom = -d;
// //
// // dirLight.shadow.camera.far = 3500;
// // dirLight.shadow.bias = -0.0001;
//
// // const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
// // scene.add(dirLightHelper);

// GROUND
const groundGeo = new THREE.PlaneGeometry(10000, 10000);
const groundMat = new THREE.MeshLambertMaterial({color: 0xffffff});
groundMat.color.setHSL(0.095, 1, 0.75);

const ground = new THREE.Mesh(groundGeo, groundMat);
ground.position.y = -33;
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

window.addEventListener('resize', onWindowResize, false)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

function animate() {
    requestAnimationFrame(animate)

    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01

    render()
    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()
// render();
