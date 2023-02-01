import { AmbientLight, DirectionalLight, DirectionalLightHelper } from 'three';
import { App } from './App';

export class Lights {
  constructor() {
    this.App = new App();
    this.scene = this.App.scene.instance;
    this.instance = {};

    this.setAmbient();
    this.setDirectional();
    this.pushLight = this.pushLight.bind(this);
  }

  setAmbient() {
    const color = '#fff';
    const intensity = 1;

    const ambientLight = new AmbientLight(color, intensity);
    this.pushLight('ambient', ambientLight);

    this.scene.add(ambientLight);
  }

  setDirectional() {
    const color = '#fff';
    const intensity = 1;

    const leftLight = new DirectionalLight(color, intensity);
    leftLight.position.set(0, 1.5, 1);

    const rightLight = new DirectionalLight(color, intensity);
    rightLight.position.set(0, 1.5, -1);

    this.pushLight('directional', leftLight);
    this.pushLight('directional', rightLight);

    const leftHelper = new DirectionalLightHelper(leftLight, 5);
    const rightHelper = new DirectionalLightHelper(rightLight, 5);

    this.scene.add(leftHelper);
    this.scene.add(rightHelper);
    this.scene.add(leftLight);
    this.scene.add(rightLight);
  }

  pushLight(mode, light) {
    const modes = this.instance.modes;

    if (!modes) {
      this.instance = {
        modes: {
          [mode]: [light],
        },
      };
      return;
    }

    if (modes.hasOwnProperty(mode)) {
      const lights = modes[mode];

      modes[mode] = [...lights, light];
    } else {
      modes[mode] = [light];
    }

    this.instance.modes = modes;
  }
}
