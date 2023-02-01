import { Scene as ThreeScene, Color } from 'three';
import { App } from './App';

export class Scene {
  constructor() {
    this.App = new App();
    this.config = this.App.config;

    this.setScene();
  }

  setScene() {
    const scene = new ThreeScene();
    scene.background = new Color('#85929E');

    this.instance = scene;
  }
}
