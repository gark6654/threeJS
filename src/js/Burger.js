import { AnimationClip, AnimationMixer, LoopOnce } from 'three';
import { App } from './App';
import { loadGLTFModel } from './utils';

export class Burger {
  constructor() {
    this.App = new App();
    this.models = this.App.models;
    this.scene = this.App.scene.instance;
    this.renderer = this.App.renderer;
    this.eventManager = this.App.eventManager.instance;

    this.onHover = this.onHover.bind(this);
    this.onLeave = this.onLeave.bind(this);
    this.update = this.update.bind(this);

    this.loadModel();
  }

  loadModel() {
    loadGLTFModel('models/burger-v1.glb', (model) => {
      const scene = model.scene;
      scene.scale.set(2, 2, 2);

      this.instance = model;

      this.mixer = new AnimationMixer(scene);
      this.animations = model.animations;

      this.scene.add(scene);
      this.models.push(model);

      scene.traverse(child => {
        if (child.isMesh) {
          this.eventManager.add(child);

          child.addEventListener('mouseover', this.onHover);
        }
      });
    });
  }

  onHover() {
    const clips = [
      // AnimationClip.findByName(this.animations, 'open'),
      AnimationClip.findByName(this.animations, 'big_bang'),
    ];

    clips.forEach(clip => {
      const action = this.mixer.clipAction(clip).setLoop(LoopOnce);

      if (!action.isRunning()) {
        action.play();
      }
    });

    this.mixer.addEventListener('finished', (e) => {
      const { action } = e;

      action.stop();
    });
  }

  onLeave() {
  }

  update() {
    if (this.mixer) {
      this.mixer.update(this.renderer.deltaTime);
    }
  }
}
