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
  
  showHumanBody(){
    this.modelSelected.emit();
  }
}
