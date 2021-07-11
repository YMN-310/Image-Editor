import { Component, ViewChild } from '@angular/core';
import { WhiteboardPageComponent } from './whiteboard-page/whiteboard-page.component';
// import { url } from 'inspector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(WhiteboardPageComponent) child: WhiteboardPageComponent ;
  modelSelected(){
    document.getElementById('E1').style.display='none';
    document.getElementById('E3').style.display='none';
    document.getElementById('E2').style.display='block';
  }
  startEditing(ImgUrl){
    this.imgData=ImgUrl;
    document.getElementById('E1').style.display='none';
    document.getElementById('E2').style.display='none';
    document.getElementById('E3').style.display='block';
    this.child.setImgUrl(ImgUrl);
  }
  backToModel(){
    console.log("back to model is received!");
    document.getElementById('E1').style.display='none';
    document.getElementById('E3').style.display='none';
    document.getElementById('E2').style.display='block';
  }
  title = 'whiteboard-app';
  
  imgData: any="Initial Value of image data";
  
}
