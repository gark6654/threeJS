import { Scene } from './Scene';
import { Renderer } from './Renderer';
import { Camera } from './Camera';
import { Lights } from './Lights';
import { Orbits } from './Orbits';
import { EventManager } from './EventManager';
import { PostProcessing } from './PostProcessing';
import { Burger } from './Burger';

export class App {
  static instance;
  static initialized;

  constructor(config) {
    if (App.instance) {
      return App.instance;
    }

    App.instance = this;

    this.config = config;

    this.update = this.update.bind(this);
    this.resize = this.resize.bind(this);
    this.setListeners();
  }

  init() {
    if (App.initialized) {
      return console.error('App is already initialized');
    }

    this.models = [];
    this.config.pixelRatio = window.devicePixelRatio;
    this.config.aspect = this.config.width / this.config.height;

    this.setScene();
    this.setCamera();
    this.setRenderer();
    this.setOrbits();
    this.setEventManager();
    this.setLights();
    this.setBurger();
    this.setPostProcessing();

    App.initialized = true;

    this.update();
  }

  setScene() {
    this.scene = new Scene();
  }

  setCamera() {
    this.camera = new Camera();
  }

  setRenderer() {
    this.renderer = new Renderer();
  }

  setOrbits() {
    this.orbits = new Orbits();
  }

  setPostProcessing() {
    this.postProcessing = new PostProcessing();
  }

  setEventManager() {
    this.eventManager = new EventManager();
  }

  setLights() {
    this.lights = new Lights();
  }

  setBurger() {
    this.burger = new Burger();
  }

  resize() {
    this.config.pixelRatio = window.devicePixelRatio;
    this.config.aspect = this.config.width / this.config.height;

    if (this.config.width < window.innerWidth) {
      this.config.width = window.innerWidth;
    }

    if (this.config.height < window.innerHeight) {
      this.config.height = window.innerHeight - 1;
    }

    Object.keys(this).forEach(key => {
      const instance = this[key];
      if (typeof instance !== 'object' || !instance.resize) return;

      instance.resize();
    })
  }

  update() {
    requestAnimationFrame(this.update);

    Object.keys(this).forEach(key => {
      const instance = this[key];
      if (typeof instance !== 'object' || !instance.update) return;

      instance.update();
    })
  }

  setListeners() {
    window.addEventListener('resize', this.resize);
  }
}
