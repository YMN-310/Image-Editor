import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WhiteboardPageComponent } from './whiteboard-page/whiteboard-page.component';
import { ShapeService } from './shape.service';
import { TextNodeService } from './text-node.service';
import { AnimatedModelComponent } from './animated-model/animated-model.component';
import { ModelsListComponent } from './models-list/models-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WhiteboardPageComponent,
    AnimatedModelComponent,
    ModelsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [
    ShapeService,
    TextNodeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
