import { Clock, WebGLRenderer } from 'three';
import { App } from './App';

export class Renderer {
  constructor() {
    this.App = new App();

    this.config = this.App.config;
    this.scene = this.App.scene.instance;
    this.camera = this.App.camera.perspectiveInstance;

    this.update = this.update.bind(this);

    this.setRenderer();
  }

  setRenderer() {
    const renderer = new WebGLRenderer(this.config.renderer);

    renderer.setSize(this.config.width, this.config.height);
    this.instance = renderer;
    this.clock = new Clock();

    this.config.target.appendChild(renderer.domElement);
  }

  update() {
    if (this.instance && this.clock) {
      this.deltaTime = this.clock.getDelta();
      this.instance.render(this.scene, this.camera);
    }
  }

  resize() {
    this.instance.setSize(this.config.width, this.config.height);
  }
}
