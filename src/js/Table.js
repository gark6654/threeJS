import { loadGLTFModel } from './utils';
import { App } from './App';

export class Table {
  constructor() {
    this.App = new App();
    this.scene = this.App.scene.instance;
    this.models = this.App.models;
    this.eventManager = this.App.eventManager.instance;

    this.loaded = false;

    this.load();
  }

  load() {
    loadGLTFModel('models/table.glb', (model) => {
      this.instance = model;
      this.loaded = true;
      model.scene.scale.set(0.001, 0.001, 0.001);

      this.models.push(model);
      this.scene.add(model.scene);

      model.scene.traverse(child => {
        if (child.children.length !== 0) return;

        this.eventManager.add(child);

        child.addEventListener('mouseover', event => {
          event.stopPropagation();
          const object = event.target;

          object.position.y += 0.05;
        });

        child.addEventListener('mouseout', event => {
          event.stopPropagation();
          const object = event.target;

          object.position.y -= 0.05;
        });
      });
    });
  }

  update() {
    if (!this.instance) return;

    this.instance.scene.rotation.y += 0.0005;
  }
}
