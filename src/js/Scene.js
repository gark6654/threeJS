import { Scene as ThreeScene } from 'three';
import * as THREE from 'three';

export class Scene {
  constructor() {
    this.setScene();
  }

  setScene() {
    const scene = new ThreeScene();
    scene.background = new THREE.Color('#85929E');

    this.instance = scene;
  }
}
