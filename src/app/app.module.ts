import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {BlogDaoModule} from "./model/blog-dao.module";
// import {BlogDaoService} from "./model/blog-dao.service";
import { RecipesComponent } from './recipes/recipes.component';
import {RouterModule, Routes} from "@angular/router";
import {KnowledgebaseModule} from "./knowledgebase/knowledgebase.module";
import { SearchComponent } from './shared/search/search.component';

const route: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(route),
    BlogDaoModule,
    KnowledgebaseModule,

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
