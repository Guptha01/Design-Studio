import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { Http } from '@angular/http';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,HttpClientModule
  ],
  providers: [HttpClientModule,Http],
  bootstrap: [AppComponent]
})
export class AppModule { }