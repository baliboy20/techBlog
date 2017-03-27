import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularFireModule} from "angularfire2";
import {BlogDaoService} from "./blog-dao.service";
import {HttpModule} from "@angular/http";

 const cfg = {
   apiKey: "AIzaSyClEv3UvyH1GxSLnuNn9AHfx0cyepwhwjg",
   authDomain: "ng1.firebaseapp.com",
   databaseURL: "https://ng1.firebaseio.com",
   storageBucket: "firebase-ng1.appspot.com",
   messagingSenderId: "152626745565"
 };

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
   AngularFireModule.initializeApp(cfg),

  ],

  providers: [BlogDaoService],
  // exports:[BlogDaoService]
})
export class BlogDaoModule { }
