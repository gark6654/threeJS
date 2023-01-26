import WebGL from 'three/addons/capabilities/WebGL';
import { createScene } from './js/scene';

import './style.scss';
import './styles/main.scss';

if (WebGL.isWebGLAvailable()) {
  const container = document.querySelector('.intro--canvas');

  const scene = createScene(container, 520, 320);
  scene.animate();

  console.log('WebGL ready to use');
} else {
  const warning = WebGL.getWebGLErrorMessage();

  alert(warning);
}
