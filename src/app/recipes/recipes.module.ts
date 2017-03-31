import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipesComponent} from "./recipes.component";
import {RouterModule} from "@angular/router";
import {SearchComponent} from "../shared/search/search.component";
import { TxComponent } from './tx/tx.component';

import { RecipeEntryComponent } from './recipe-entry/recipe-entry.component';

// export const recipeRoutes = RouterModule.forChild([
export const recipeRoutes =  ([
   {path: 'recipes', component: RecipesComponent,
   children: [
     {path: '', redirectTo: 'search', pathMatch: 'full'},
     {path: 'search', component: SearchComponent},
     {path: 'recipe-entry/:id', component: RecipeEntryComponent},
     {path: 'recipe-entry', component: RecipeEntryComponent},
   ]},

    // {path: 'test1', component: RecipesComponent},
    // {path: 'test2', component: RecipesComponent}
  ])



@NgModule({
  imports: [
    CommonModule,
    RouterModule
    ],
    declarations: [RecipesComponent, TxComponent, RecipeEntryComponent],
 exports: []
})
export class RecipesModule {
}
