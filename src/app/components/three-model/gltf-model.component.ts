import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { Object3D } from "three";

const BACKGROUND_COLOR = 0x202020;
const LIGHT_COLOR = 0x4b371c;

@Component({
  selector: 'mcs-gltf-model',
  templateUrl: './gltf-model.component.html',
  styleUrls: ['./gltf-model.component.scss']
})
export class GltfModelComponent implements AfterViewInit {
  @ViewChild('canvas') private canvasRef!: ElementRef;

  @Input() fieldOfView = 1;
  @Input('nearClipping') nearClippingPane = 1;
  @Input('farClipping') farClippingPane = 1000;

  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private light1!: THREE.PointLight;
  private light2!: THREE.PointLight;
  private light3!: THREE.PointLight;
  private light4!: THREE.PointLight;
  private model!: Object3D;
  private directionalLight!: THREE.DirectionalLight;
  private loaderGLTF = new GLTFLoader();
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.createScene();
    this.startRenderingLoop();
    this.createControls();
  }

  private createControls(): void {
    const renderer = new CSS2DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    document.body.appendChild(renderer.domElement);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.autoRotate = true;
    this.controls.enableZoom = true;
    this.controls.enablePan = false;
    this.controls.update();
  };

  private createScene(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(BACKGROUND_COLOR);
    this.loadModel();
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    )
    this.camera.position.x = 200;
    this.camera.position.y = 200;
    this.camera.position.z = 200;
    this.setLight();
  }

  private loadModel(): void {  // TODO: move to service;
    this.loaderGLTF.load('assets/models/museum2/scene.gltf', (gltf: GLTF) => {
      this.model = gltf.scene.children[0];
      let box = new THREE.Box3().setFromObject(this.model);
      box.getCenter(this.model.position);
      this.model.position.multiplyScalar(-1);
      this.scene.add(this.model);
    });
  }

  private setLight(): void {
    this.directionalLight = new THREE.DirectionalLight(0xffdf04, 0.4);
    this.directionalLight.position.set(0, 1, 0);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);

    this.light1 = new THREE.PointLight(LIGHT_COLOR, 4);
    this.light1.position.set(0, 200, 400);
    this.scene.add(this.light1);
    this.light2 = new THREE.PointLight(LIGHT_COLOR, 4);
    this.light2.position.set(500, 100, 0);
    this.scene.add(this.light2);
    this.light3 = new THREE.PointLight(LIGHT_COLOR, 4);
    this.light3.position.set(0, 100, -500);
    this.scene.add(this.light3);
    this.light4 = new THREE.PointLight(LIGHT_COLOR, 4);
    this.light4.position.set(-500, 300, 500);
    this.scene.add(this.light4);
  }

  private getAspectRatio(): number {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private startRenderingLoop(): void {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: GltfModelComponent = this;
    (function render() {
      component.renderer.render(component.scene, component.camera);
      requestAnimationFrame(render);
    }());
  }
}
