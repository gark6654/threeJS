import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls';

const { innerWidth, innerHeight } = window;

const DEFAULT_WIDTH = innerWidth;
const DEFAULT_HEIGHT = innerHeight - 1;

export function createScene(container, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT) {
  const objects = [];

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('white');

  const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1);
  objects.push(ambientLight);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(1, 1.5, 2);
  camera.lookAt( 0, 1, 0);

  const renderer = new THREE.WebGLRenderer({
    initialise: true,
  });
  renderer.setSize(width, height);

  container.appendChild(renderer.domElement);
  objects.forEach(object => {
    scene.add(object);
  })

  let airplane;
  loadModel('models/ethereum.glb', (model) => {
    airplane = model;
    scene.add(model);
  });

  window.addEventListener('resize', () => {
    const { innerWidth, innerHeight } = window;

    renderer.setSize(innerWidth, innerHeight - 1);
  });

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  function animate() {
    requestAnimationFrame(animate);

    airplane.rotation.y += 0.007;
    controls.update();

    renderer.render(scene, camera);
  }

  return {
    animate,
  };
}

function createCubeMaterial(path) {
  const cubeTextureLoader = new THREE.CubeTextureLoader();
  cubeTextureLoader.setPath(`assets/${path}`)

  return cubeTextureLoader.load([
    'px.jpg', 'nx.jpg',
    'py.jpg', 'ny.jpg',
    'pz.jpg', 'nz.jpg',
  ]);
}

function loadModel(path, onLoad) {
  const loader = new GLTFLoader();
  loader.load(`assets/${path}`, model => {
    onLoad(model.scene);
  }, undefined, (err) => {
    console.log(err);
  })
}
