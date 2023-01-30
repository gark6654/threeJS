import { InteractionManager } from 'three.interactive';
import { App } from './App';

export class EventManager {
  constructor() {
    this.App = new App();
    this.renderer = this.App.renderer.instance;
    this.camera = this.App.camera.perspectiveInstance;

    this.setInteraction();
  }

  setInteraction() {
    this.instance = new InteractionManager(
      this.renderer,
      this.camera,
      this.renderer.domElement
    );

    this.instance.update();
  }

  update() {
    this.instance.update();
  }
}
