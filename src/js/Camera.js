import { PerspectiveCamera } from 'three';
import { App } from './App';

export class Camera {
  constructor() {
    this.App = new App();

    this.config = this.App.config;
    this.scene = this.App.scene.instance;

    this.setPerspectiveCamera();
  }

  setPerspectiveCamera() {
    const perspectiveCamera = new PerspectiveCamera(75, this.config.aspect, 0.1, 1000);
    perspectiveCamera.position.set(-1, 1, 1);
    // perspectiveCamera.rotation.set(0, 0, 0);
    perspectiveCamera.lookAt(0, 0, 0);

    this.perspectiveInstance = perspectiveCamera;

    this.scene.add(perspectiveCamera);
  }

  resize() {
    this.perspectiveInstance.aspect = this.config.aspect;
    this.perspectiveInstance.updateProjectionMatrix();
  }
}
