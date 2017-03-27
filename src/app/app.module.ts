import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {BlogDaoModule} from "./model/blog-dao.module";
import {BlogDaoService} from "./model/blog-dao.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BlogDaoModule

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
