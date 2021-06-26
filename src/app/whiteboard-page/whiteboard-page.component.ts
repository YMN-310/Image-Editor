import { Component, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import Konva from 'konva';
import { ShapeService } from '../shape.service';
import { TextNodeService } from '../text-node.service';
@Component({
  selector: 'app-whiteboard-page',
  templateUrl: './whiteboard-page.component.html',
  styleUrls: ['./whiteboard-page.component.css']
})
export class WhiteboardPageComponent implements OnInit {
  shapes: any = [];
  stage: any;
  layer: Konva.Layer;
  selectedButton: any = {
    'circle': false,
    'rectangle': false,
    'line': false,
    'undo': false,
    'erase': false,
    'text': false,
    'arrow': false,
    'tick': false,
    'triangle': false
  }
  // reshape: Konva.Transformer = new Konva.Transformer();
  erase: boolean = false;
  transformers: Konva.Transformer[] = [];
  constructor(
    private shapeService: ShapeService,
    private textNodeService: TextNodeService
  ) { }
  ngOnInit() {
    let width = window.innerWidth * 0.9;
    let height = window.innerHeight;
    this.stage = new Konva.Stage({
      container: 'container',
      type: 'Stage',
      width: width,
      height: height
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    this.addLineListeners();
  }
  clearSelection() {
    Object.keys(this.selectedButton).forEach(key => {
      this.selectedButton[key] = false;
    })
  }
  setSelection(type: string) {
    this.selectedButton[type] = true;
  }
  addShape(type: string) {
    this.clearSelection();
    this.setSelection(type);
    if (type == 'circle') {
      this.addCircle();
    }
    else if (type == 'line') {
      this.addLine();
    }
    else if (type == 'rectangle') {
      this.addRectangle();
    }
    else if (type == 'text') {
      this.addText();
    }
    else if(type == 'arrow') {
      this.addArrow();
    }
    else if(type == 'tick') {
      this.addTick();
    }
    else if(type == 'triangle') {
      this.addTriangle();
    }
  }
  addText() {
    const text = this.textNodeService.textNode(this.stage, this.layer);
    this.shapes.push(text.textNode);
    this.transformers.push(text.tr);
  }
  addCircle() {
    const circle = this.shapeService.circle();
    this.shapes.push(circle);
    this.layer.add(circle);
    this.stage.add(this.layer);
    this.addTransformerListeners();
  }
  addArrow() {
    const arrow = this.shapeService.arrow();
    this.shapes.push(arrow);
    this.layer.add(arrow);
    this.stage.add(this.layer);
    this.addTransformerListeners();
  }
  addTick() {
    const tick = this.shapeService.tick();
    this.shapes.push(tick);
    this.layer.add(tick);
    this.stage.add(this.layer);
    tick.getSelfRect = function(){
      return{
        x: 15,
        y: 60,
        width: 45,
        height: 30
      };
    }
    this.addTransformerListeners();
  }
  addRectangle() {
    const rectangle = this.shapeService.rectangle();
    this.shapes.push(rectangle);
    this.layer.add(rectangle);
    this.stage.add(this.layer);
    this.addTransformerListeners(); 
  }
  addTriangle() {
    const triangle = this.shapeService.triangle();
    this.shapes.push(triangle);
    this.layer.add(triangle);
    this.stage.add(this.layer);
    this.addTransformerListeners(); 
  }
  addLine() {
    this.selectedButton['line'] = true;
  }
  addLineListeners() {
    const component = this;
    let lastLine;
    let isPaint;
    this.stage.on('mousedown touchstart', function (e) {
      if (!component.selectedButton['line'] && !component.erase) {
        return;
      }
      isPaint = true;
      let pos = component.stage.getPointerPosition();
      const mode = component.erase ? 'erase' : 'brush';
      lastLine = component.shapeService.line(pos, mode)
      component.shapes.push(lastLine);
      component.layer.add(lastLine);
    });
    this.stage.on('mouseup touchend', function () {
      isPaint = false;
    });
    // and core function - drawing
    this.stage.on('mousemove touchmove', function () {
      if (!isPaint) {
        return;
      }
      const pos = component.stage.getPointerPosition();
      var newPoints = lastLine.points().concat([pos.x, pos.y]);
      lastLine.points(newPoints);
      component.layer.batchDraw();
    });
  }
  undo() {
    const removedShape = this.shapes.pop();
    this.transformers.forEach(t => {
      t.detach();
    });
    if (removedShape) {
      removedShape.remove();
    }
    this.layer.draw();
  }
  /*****************Clean Functions *******************/

  cleanBG(){
    for (var i = 0; i < this.shapes.length; i++) {
        // reshape.detach();
        this.shapes[i].destroy();
        this.shapes.splice(i, 1);
        i--;
    }
  }

  cleanfunc(){
    // this.not_draw();
    this.transformers.forEach(t => {
      t.detach();
    });
    for (var i = 0; i < this.shapes.length; i++) {
      if (this.shapes[i]["attrs"].type !== "Image") {
        // reshape.detach();
        this.shapes[i].destroy();
        this.shapes.splice(i, 1);
        i--;
      }
    }
    console.log('clean',this.shapes);
  }
  
  cleanshapesfunc(){
    // this.not_draw();
    this.transformers.forEach(t => {
      t.detach();
    });
    for (var i = 0; i < this.shapes.length; i++) {
      if (
        this.shapes[i]["attrs"].type !== "Image" &&
        this.shapes[i]["attrs"].type !== "Text" &&
        this.shapes[i]["attrs"].type !== "Draw"
      ) {
        // reshape.detach();
        this.shapes[i].destroy();
        this.shapes.splice(i, 1);
        i--;
      }
    }
    console.log('cleanshape',this.shapes);
  }
  
  cleancirclefunc(){
    // this.not_draw();
    this.transformers.forEach(t => {
      t.detach();
    });
    for (var i = 0; i < this.shapes.length; i++) {
      if (this.shapes[i]["attrs"].type === "Circle") {
        // reshape.detach();
        this.shapes[i].destroy();
        this.shapes.splice(i, 1);
        i--;
      }
    }
    console.log('cleancircle',this.shapes);
  }
  
  cleanrectanglefunc(){
    // this.not_draw();
    this.transformers.forEach(t => {
      t.detach();
    });
    for (var i = 0; i < this.shapes.length; i++) {
      if (this.shapes[i]["attrs"].type === "Rectangle") {
        // reshape.detach();
        this.shapes[i].destroy();
        this.shapes.splice(i, 1);
        i--;
      }
    }
    console.log('cleanrectangle',this.shapes);
  }

  /*****************Clean Functions *******************/
  /*****************Image Upload *******************/
  imgUpload(e: any) {
    var URL = window.webkitURL || window.URL;
    var url = URL.createObjectURL(e.target.files[0]);
    var img = new Image();
    img.src = url;
    var _shapes = this.shapes;
    var _layer = this.layer;
    var _stage=this.stage;
    var _this=this;
    
    img.onload = function(e) {
      _this.cleanBG();
      console.log(e);
      var w=e.currentTarget['width']; //Taking width and height of the image.
      var h=e.currentTarget['height'];
      _this.resizeStage(w,h);// Resizing stage according to the width and height of image.
      console.log("Image width: "+w);
      console.log("Image height: "+h);
      var theImg = new Konva.Image({
        image: img,
        type: 'Image',
        x: 0,
        y: 0,
        width: w,
        height: h
        });
      _shapes.push(theImg);
      _layer.add(theImg);
      _stage.add(_layer);
    }
  }
  resizeStage(w: any,h:any){
    this.stage.width(w);
    this.stage.height(h);
  }
  /**************************Image Upload *****************************/
  /**************************Download *********************************/

  downloadImage(){
    var dataURL = this.stage.toDataURL({ 
      mimeType: "image/jpeg",
      quality: 0.9, //***Quality at .9 for first compression.*** 
      pixelRatio: 3
      });
    var _stage=this.stage;
    var _this=this;
    console.log("Size after first compression: "+dataURL.length/1024 +"Kb");
    //****Condition for second compression*****//
    if(dataURL.length<1024*200) this.downloadURI(dataURL, 'stage.jpeg');
    else{
      const blobURL = dataURL;
      const img = new Image();
      img.src = blobURL;
      img.onerror = function () {
        URL.revokeObjectURL(this.src);
        // Handle the failure properly
        console.log("Cannot load image");
      };
      img.onload = function () {
        URL.revokeObjectURL(img.src);
        const canvas = document.createElement("canvas");
        //***Increase resolution of canvas for more clarity.***//
        canvas.width = 2*_stage.width();
        canvas.height = 2*_stage.height();
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            _this.downloadBlob(blob, 'stage.jpeg');
            console.log("Size after second compression: "+blob.size/1024 +"Kb");
            //Checks file size in Kb.
          },
          "image/jpeg",
          0.9
        );
      };
    }
  }

  downloadURI(uri:any, name:any) {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link.remove();
  }

  downloadBlob(blob:any, name = 'stage.jpeg') {
    const data = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = data;
    link.download = name;
    link.dispatchEvent(
      new MouseEvent('click', { 
      bubbles: true, 
      cancelable: true, 
      view: window 
     })
    );
  }

  /**************************Download *********************************/
  addTransformerListeners() {
    const component = this;
    const tr = new Konva.Transformer();
    this.stage.on('click', function (e) {
      console.log(e);
      
      console.log(e.target);
      console.log('ID: '+e.target._id);
      if (e.target.attrs.type!=='Stage'&&e.target.attrs.type!=='Image') { 
        component.addDeleteListener(e.target);
        component.layer.add(tr);
        tr.attachTo(e.target);
        component.transformers.push(tr);
        // tr.nodes([e.target]);
        component.layer.draw();
      }
      else {
        tr.detach();
        component.layer.draw();
      }
    });
  }
  addDeleteListener(shape: any) {
    const component = this;
    window.addEventListener('keydown', function (e) {
      if (e.keyCode === 46) {
        shape.remove();
        component.transformers.forEach(t => {
          t.detach();
        });
        const selectedShape = component.shapes.find(s => s._id == shape._id);
        selectedShape.remove();
        e.preventDefault();
      }
      component.layer.batchDraw();
    });
  }
}

