import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as BABYLON from 'babylonjs';
import "babylonjs-loaders";

@Component({
  selector: 'app-animated-model',
  templateUrl: './animated-model.component.html',
  styleUrls: ['./animated-model.component.css']
})
export class AnimatedModelComponent implements OnInit {

  constructor() { }

  @Output() startEditing: EventEmitter<any> = new EventEmitter();

  snapshotRequested=false;

  ngOnInit(): void {
    
    // const _this=this;
    // const createScene = async function() {
    //   const scene = new BABYLON.Scene(engine);
      
    //   const camera = new BABYLON.ArcRotateCamera("camera",Math.PI/2, Math.PI/2, 250, new BABYLON.Vector3(0, 80, 0), scene);
    //   camera.attachControl(canvas, true);
      
    //   const lightx = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(2, 0, 0), scene);
    //   const lighty = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 2, 0), scene);
    //   const lightz = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 2), scene);

    //   let head = await BABYLON.SceneLoader.ImportMeshAsync("", "assets/", "Male.obj", scene);
    //   console.log(head);
    //   const head_mat = new BABYLON.StandardMaterial("head_mat", scene);
    //   head_mat.diffuseTexture= new BABYLON.Texture("assets/TextureMale.png",scene);
    //   head_mat.specularColor=new BABYLON.Color3(0.2,.2,.2);
    //   let _head = scene.getMeshByName("Male");
    //   console.log(_head);
    //   _head.material=head_mat;

    //   return scene;
    // }
    // const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    // canvas.width=window.innerWidth-100;
    // canvas.height=window.innerHeight;

    // const engine = new BABYLON.Engine(canvas, true);

    // createScene().then((scene)=>{
    //   engine.runRenderLoop(function () {
    //   scene.render();
    //   if (_this.snapshotRequested) {
    //     _this.snapshotRequested = false;
    //     var canvas= document.getElementById('renderCanvas') as HTMLCanvasElement;
    //     let ImgURL = canvas.toDataURL();
    //     _this.startEditing.emit(ImgURL);
    //   }
    //   });
    //   window.addEventListener("resize", function () {
    //   engine.resize();
    //   });
    // });
  }

  startBabylon(modelData){
    const _this=this;
    const createScene = async function() {
      const scene = new BABYLON.Scene(engine);
      
      const camera = new BABYLON.ArcRotateCamera("camera",Math.PI/2, Math.PI/2, 250, new BABYLON.Vector3(0, 80, 0), scene);
      camera.attachControl(canvas, true);
      
      const lightx = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(2, 0, 0), scene);
      const lighty = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 2, 0), scene);
      const lightz = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 2), scene);

      let head = await BABYLON.SceneLoader.ImportMeshAsync("", "assets/", modelData.modelSrc , scene);
      console.log(head);
      const head_mat = new BABYLON.StandardMaterial("head_mat", scene);
      head_mat.diffuseTexture= new BABYLON.Texture(modelData.textureSrc,scene);
      head_mat.specularColor=new BABYLON.Color3(0.2,.2,.2);
      let _head = scene.getMeshByName(modelData.meshName);
      console.log(_head);
      _head.material=head_mat;

      return scene;
    }
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    canvas.width=window.innerWidth-100;
    canvas.height=window.innerHeight;

    const engine = new BABYLON.Engine(canvas, true);

    createScene().then((scene)=>{
      engine.runRenderLoop(function () {
      scene.render();
      if (_this.snapshotRequested) {
        _this.snapshotRequested = false;
        var canvas= document.getElementById('renderCanvas') as HTMLCanvasElement;
        let ImgURL = canvas.toDataURL();
        _this.startEditing.emit(ImgURL);
      }
      });
      window.addEventListener("resize", function () {
      engine.resize();
      });
    });
  }

  moveToKonva(){
    this.snapshotRequested=true;
  }

}
