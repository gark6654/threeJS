import WebGL from 'three/addons/capabilities/WebGL';
import { App } from './js/App';

import './styles/main.scss';

if (WebGL.isWebGLAvailable()) {
  const container = document.querySelector('#root');
  console.log('WebGL ready to use');

  const app = new App({
    target: container,
  });

  app.init();
} else {
  const warning = WebGL.getWebGLErrorMessage();
  console.error(warning);
}
