import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function loadGLTFModel(path, onLoad) {
  const loader = new GLTFLoader();

  loader.load(`assets/${path}`, onLoad);
}
