import { Component, ViewChild } from '@angular/core';
import { WhiteboardPageComponent } from './whiteboard-page/whiteboard-page.component';
import { ModelsListComponent } from './models-list/models-list.component';
import { AnimatedModelComponent } from './animated-model/animated-model.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(WhiteboardPageComponent) whiteboard_child: WhiteboardPageComponent ;
  @ViewChild(ModelsListComponent) models_list_child: ModelsListComponent;
  @ViewChild(AnimatedModelComponent) animated_model_child: AnimatedModelComponent;

  modelSelected(modelData: any){
    document.getElementById('E1').style.display='none';
    document.getElementById('E3').style.display='none';
    document.getElementById('E2').style.display='block';
    // this.animated_model_child.ngOnInit();
    this.animated_model_child.startBabylon(modelData);
  }
  startEditing(ImgUrl){
    document.getElementById('E1').style.display='none';
    document.getElementById('E2').style.display='none';
    document.getElementById('E3').style.display='block';
    this.whiteboard_child.setImgUrl(ImgUrl);
  }
  backToModel(){
    console.log("back to model is received!");
    document.getElementById('E1').style.display='none';
    document.getElementById('E3').style.display='none';
    document.getElementById('E2').style.display='block';
  }
  title = 'whiteboard-app';
  
}
