import { WebGLRenderer } from 'three';
import { App } from './App';

export class Renderer {
  constructor() {
    this.App = new App();

    this.config = this.App.config;
    this.scene = this.App.scene.instance;
    this.camera = this.App.camera.perspectiveInstance;

    this.setRenderer();
  }

  setRenderer() {
    const renderer = new WebGLRenderer({
      initialise: true,
    });

    renderer.setSize(this.config.width, this.config.height);
    this.instance = renderer;

    this.config.target.appendChild(renderer.domElement);
  }

  update() {
    this.instance.render(this.scene, this.camera);
  }

  resize() {
    this.instance.setSize(this.config.width, this.config.height);
  }
}
