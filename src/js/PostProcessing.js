import { App } from './App';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer';
import { RenderPass } from 'three/addons/postprocessing/RenderPass';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass';

export class PostProcessing {
  constructor() {
    this.App = new App();
    this.scene = this.App.scene.instance;
    this.camera = this.App.camera.perspectiveInstance;
    this.renderer = this.App.renderer.instance;

    this.setEffectComposer();
    this.setRenderPass();
    // this.setGlitchPass();
  }

  setEffectComposer() {
    this.EffectComposerInstance = new EffectComposer(this.renderer);
  }

  setRenderPass() {
    const renderPass = new RenderPass(this.scene, this.camera);
    this.EffectComposerInstance.addPass(renderPass);
  }

  setGlitchPass() {
    const glitchPass = new GlitchPass();
    this.EffectComposerInstance.addPass(glitchPass);
  }

  update() {
    this.EffectComposerInstance.render();
  }
}
