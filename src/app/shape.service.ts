import { Injectable } from '@angular/core';
import Konva from 'konva';
@Injectable({
providedIn: 'root'
})
export class ShapeService {
  constructor() { }
  circle(clr) {
    return new Konva.Circle({
      x: 300,
      y: 100,
      type: 'Circle',
      radius: 70,
      // fill: 'red',
      strokeScaleEnabled: false,
      stroke: clr,
      strokeWidth: 4,
      draggable: true
    });
  }
  triangle(clr){
    return new Konva.RegularPolygon({
      x: 400,
      y: 150,
      sides: 3,
      radius: 50,
      type : "Triangle",
      draggable: true,
      stroke: clr,
      strokeWidth: 4,
      strokeScaleEnabled: false,
      });
  }
  arrow(clr) {
    return new Konva.Arrow({
      x: 400,
      y: 100,
      points: [0, 0, 100, 100],
      pointerLength: 10,
      pointerWidth: 10,
      fill: clr,
      stroke: clr,
      type: 'Arrow',
      draggable: true,
      strokeWidth: 5,
      strokeScaleEnabled: false,
      hitStrokeWidth: 50
     });
  }
  tick(clr: any) {
    return new Konva.Shape({
      x: 300,
      y: 100,
      type: 'Tick',
      draggable: true,
      strokeScaleEnabled: false,
      sceneFunc: function (context, shape) {
        context.beginPath();
        context.moveTo(15, 75);
        context.lineTo(30, 90);
        context.lineTo(60, 60);
        context.fillStrokeShape(shape);
      },
      hitFunc: function (context, shape){
        context.beginPath();
        context.rect(15,60,45,30);
        context.fillStrokeShape(shape);
      },
      stroke: clr,
      strokeWidth: 5,  
    });
  }
  line(pos:any, mode: string = 'brush') {
    return new Konva.Line({
      stroke: '#df4b26',
      strokeWidth: 5,
      globalCompositeOperation:
        mode === 'brush' ? 'source-over' : 'destination-out',
      points: [pos.x, pos.y],
      draggable: mode == 'brush'
    });
  }
  rectangle(clr: any) {
    return new Konva.Rect({
      x: 300,
      y: 100,
      type: 'Rectangle',
      width: 150,
      height: 100,
      // fill: 'green',
      strokeScaleEnabled: false,
      stroke: clr,
      strokeWidth: 4,
      draggable: true
    });
  }
}