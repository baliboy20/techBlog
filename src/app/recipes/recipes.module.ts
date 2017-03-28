import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipesComponent} from "./recipes.component";
import {RouterModule} from "@angular/router";
import {SearchComponent} from "../shared/search/search.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: 'recipes', component: RecipesComponent,
    children: [
      {path: '', redirectTo: 'search', pathMatch: 'full'},
      {path: 'search', component: SearchComponent}
      ]},
      // {path: 'knowledgebase/recipes/search', component: SearchComponent}
    ])
  ],
  declarations: []
})
export class RecipesModule { }
