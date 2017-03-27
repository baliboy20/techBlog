import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipesComponent} from "./recipes.component";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{path: 'recipes', component: RecipesComponent}])
  ],
  declarations: []
})
export class RecipesModule { }
