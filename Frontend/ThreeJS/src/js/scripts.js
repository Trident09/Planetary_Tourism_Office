import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import starsTexture from '../img/stars.jpg';
import sunTexture from '../img/sun.jpg';
import mercuryTexture from '../img/mercury.jpg';
import venusTexture from '../img/venus.jpg';
import earthTexture from '../img/earth.jpg';
import marsTexture from '../img/mars.jpg';
import jupiterTexture from '../img/jupiter.jpg';
import saturnTexture from '../img/saturn.jpg';
import saturnRingTexture from '../img/saturn ring.png';
import uranusTexture from '../img/uranus.jpg';
import uranusRingTexture from '../img/uranus ring.png';
import neptuneTexture from '../img/neptune.jpg';
import plutoTexture from '../img/pluto.jpg';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

let planets = [];
function createPlanete(name,size, texture, position, ring) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.name = name; 
    planets.push(mesh);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if(ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj}
}

const mercury = createPlanete('Mercury', 3.2, mercuryTexture, 28);
const venus = createPlanete('Venus', 5.8, venusTexture, 44);
const earth = createPlanete("Earth", 6, earthTexture, 62);
const mars = createPlanete('Mars', 4, marsTexture, 78);
const jupiter = createPlanete('Jupiter', 12, jupiterTexture, 100);
const saturn = createPlanete('Saturn', 10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});
const uranus = createPlanete('Uranus',7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
});
const neptune = createPlanete('Neptune',7, neptuneTexture, 200);
const pluto = createPlanete('Pluto',2.8, plutoTexture, 216);

const pointLight = new THREE.PointLight(0xFFFFFF, 3, 300);
scene.add(pointLight);


window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('click', onClick, false);

function onClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planets);

    // Remove existing card
    // const existingCard = document.querySelector('.planet-card');
    // if (existingCard) {
    //     existingCard.remove();
    // }   
    // Show new card if a planet was clicked
    if (intersects.length > 0) {
       
        console.log(intersects[0].object.name);
        if(intersects[0].object.name === 'Mercury') {
            document.getElementById('mercury').showModal();
          }
        else if(intersects[0].object.name === 'Venus') {
            document.getElementById('venus').showModal();
          }
        else if(intersects[0].object.name === 'Earth') {
            document.getElementById('earth').showModal();
          }
        else if(intersects[0].object.name === 'Mars') {
            document.getElementById('mars').showModal();
          }
        else if(intersects[0].object.name === 'Jupiter') {
            document.getElementById('jupiter').showModal();
          }
        else if(intersects[0].object.name === 'Saturn') {
            document.getElementById('saturn').showModal();
          }
        else if(intersects[0].object.name === 'Uranus') {
            document.getElementById('uranus').showModal();
          }
        else if(intersects[0].object.name === 'Neptune') {
            document.getElementById('neptune').showModal();
          }
    }
}
// window.addEventListener('click', onClick, false);


let planetData = {};

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        planetData = data.reduce((obj, item) => {
            obj[item.name] = item;
            return obj;
        }, {});
    });
function showCard(planet) {

    const card = document.createElement('div');
    card.className = 'planet-card';

    const name = document.createElement('h1');
    name.textContent = planet.name;  // You need to set this property when creating the planets
    card.appendChild(name);

    const button1 = document.createElement('button');
    button1.textContent = 'More Info';
    button1.addEventListener('click', () => {
        // Change displayed information here
    });
    
    card.appendChild(button1);
    document.body.appendChild(card);
}


function animate() {

    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    earth.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.03);
    uranus.mesh.rotateY(0.02);
    neptune.mesh.rotateY(0.02);
    pluto.mesh.rotateY(0.01);

    mercury.obj.rotation.y += 0.01;
    venus.obj.rotation.y += 0.02;
    earth.obj.rotation.y += 0.008;
    mars.obj.rotation.y += 0.006;
    jupiter.obj.rotation.y += 0.004;
    saturn.obj.rotation.y += 0.003;
    uranus.obj.rotation.y += 0.002;
    neptune.obj.rotation.y += 0.001;
    pluto.obj.rotation.y += 0.001;

   requestAnimationFrame(animate);
   renderer.render(scene, camera);
}
animate();

