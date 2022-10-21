import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GltfModelComponent } from './components/three-model/gltf-model.component';

@NgModule({
  declarations: [
    AppComponent,
    GltfModelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
