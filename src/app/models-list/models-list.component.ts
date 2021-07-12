import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
//Event emitter helps to call parent functions.
@Component({
  selector: 'app-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.css']
})
export class ModelsListComponent implements OnInit {

 
  @Output() modelSelected: EventEmitter<any> = new EventEmitter();
  constructor() { }
  

  ngOnInit(): void { 
  }
  
  modelData={
    modelSrc: "",
    textureSrc: "",
    meshName: ""
  }

  showHumanBody(){
    this.modelData.modelSrc="Male.obj";
    this.modelData.textureSrc="assets/TextureMale.png";
    this.modelData.meshName="Male";
    this.modelSelected.emit(this.modelData);
  }
  showBrain(){
    this.modelData.modelSrc="Brain.obj";
    this.modelData.textureSrc="assets/brain_tex.jpg";
    this.modelData.meshName="Brain";
    this.modelSelected.emit(this.modelData);
  }
  showHeart(){
    this.modelData.modelSrc="Heart.obj";
    this.modelData.textureSrc="assets/heart_tex.jpg";
    this.modelData.meshName="Heart";
    this.modelSelected.emit(this.modelData);
  }
}
