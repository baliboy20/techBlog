import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipesComponent} from "./recipes.component";
import {RouterModule} from "@angular/router";
import {SearchComponent} from "../shared/search/search.component";

const routes = RouterModule.forChild([{
  path: 'recipes', component: RecipesComponent,
  children: [
    {path: '', redirectTo: 'search', pathMatch: 'full'},
    {path: 'search', component: RecipesComponent}
  ]
},

]);


@NgModule({
  imports: [
    CommonModule,
    routes],
    declarations: [RecipesComponent],
 exports: []
})
export class RecipesModule {
}
