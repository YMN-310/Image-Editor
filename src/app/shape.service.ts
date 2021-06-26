import { Injectable } from '@angular/core';
import Konva from 'konva';
@Injectable({
providedIn: 'root'
})
export class ShapeService {
  constructor() { }
  circle() {
    return new Konva.Circle({
      x: 100,
      y: 100,
      radius: 70,
      // fill: 'red',
      strokeScaleEnabled: false,
      stroke: 'black',
      strokeWidth: 4,
      draggable: true
    });
  }
  arrow() {
    return new Konva.Arrow({
      x: 400,
      y: 100,
      points: [0, 0, 100, 100],
      pointerLength: 10,
      pointerWidth: 10,
      fill: 'black',
      stroke: 'black',
      type: 'Arrow',
      draggable: true,
      strokeWidth: 5,
      strokeScaleEnabled: false,
      hitStrokeWidth: 50
     });
  }
  tick() {
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
      stroke: 'black',
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
  rectangle() {
    return new Konva.Rect({
      x: 20,
      y: 20,
      width: 100,
      height: 50,
      // fill: 'green',
      strokeScaleEnabled: false,
      stroke: 'black',
      strokeWidth: 4,
      draggable: true
    });
  }
}