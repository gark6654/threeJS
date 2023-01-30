import { Table } from './Table';
import { Scene } from './Scene';
import { Renderer } from './Renderer';
import { Camera } from './Camera';
import { Lights } from './Lights';
import { Orbits } from './Orbits';
import { EventManager } from './EventManager';

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

    console.log('App init');
    const { innerWidth, innerHeight, devicePixelRatio } = window;

    this.models = [];
    this.config.width = innerWidth;
    this.config.height = innerHeight - 1;
    this.config.pixelRatio = devicePixelRatio;
    this.config.aspect = this.config.width / this.config.height;

    this.setScene();
    this.setCamera();
    this.setRenderer();
    this.setOrbits();
    this.setEventManager();
    this.setLights();
    this.setTable();

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

  setEventManager() {
    this.eventManager = new EventManager();
  }

  setLights() {
    this.lights = new Lights();
  }

  setTable() {
    this.table = new Table();
  }

  resize() {
    this.config.width = innerWidth;
    this.config.height = innerHeight - 1;
    this.config.pixelRatio = devicePixelRatio;
    this.config.aspect = this.config.width / this.config.height;

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
