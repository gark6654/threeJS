import { App } from './App';
import { OrbitControls } from 'three/addons/controls/OrbitControls';

export class Orbits {
  constructor() {
    this.App = new App();

    this.renderer = this.App.renderer.instance;
    this.camera = this.App.camera.perspectiveInstance;

    this.setOrbits();
  }

  setOrbits() {
    const orbits = new OrbitControls(this.camera, this.renderer.domElement);
    orbits.update();

    this.instance = orbits;
  }

  update() {
    this.instance.update();
  }
}
