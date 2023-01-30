import { AmbientLight } from 'three';
import { App } from './App';

export class Lights {
  constructor() {
    this.App = new App();
    this.scene = this.App.scene.instance;

    this.setAmbient();
  }

  setAmbient() {
    const color = '#fff';
    const intensity = 1;

    const ambientLight = new AmbientLight(color, intensity);
    this.ambientInstance = ambientLight;

    this.scene.add(ambientLight);
  }
}
