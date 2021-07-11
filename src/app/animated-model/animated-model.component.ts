import { Component, OnInit } from '@angular/core';
import * as BABYLON from 'babylonjs';
import "babylonjs-loaders";

@Component({
  selector: 'app-animated-model',
  templateUrl: './animated-model.component.html',
  styleUrls: ['./animated-model.component.css']
})
export class AnimatedModelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const createScene = async function() {
      const scene = new BABYLON.Scene(engine);

      const camera = new BABYLON.ArcRotateCamera("camera",Math.PI/2, Math.PI/2, 250, new BABYLON.Vector3(0, 80, 0), scene);
      camera.attachControl(canvas, true);

      const lightx = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(2, 0, 0), scene);
      const lighty = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 2, 0), scene);
      const lightz = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 0, 2), scene);

      let head = await BABYLON.SceneLoader.ImportMeshAsync("", "assets/", "Male.obj", scene);
      let body = await BABYLON.SceneLoader.ImportMeshAsync("", "assets/", "Male.obj", scene);
      console.log(head);
      const head_mat = new BABYLON.StandardMaterial("head_mat", scene);
      head_mat.diffuseTexture= new BABYLON.Texture("assets/TextureMale.png",scene);
      head_mat.specularColor=new BABYLON.Color3(0.2,.2,.2);
      let _head = scene.getMeshByName("Male");
      _head.position= new BABYLON.Vector3(100,0,0);
      console.log(_head);
      _head.material=head_mat;

      return scene;
    }
    // const canvas = document.querySelector('canvas');
    // canvas.setAttribute('id','renderCanvas');
    // const canvas = document.getElementById("BabyCanvas") as HTMLCanvasElement;
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    canvas.width=window.innerWidth-100;
    canvas.height=window.innerHeight;

    const engine = new BABYLON.Engine(canvas, true);

    createScene().then((scene)=>{
      engine.runRenderLoop(function () {
      scene.render();
    });
    window.addEventListener("resize", function () {
      engine.resize();
    });
    });
  }

}
