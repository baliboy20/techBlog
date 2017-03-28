import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecipesComponent} from "./recipes.component";
import {RouterModule} from "@angular/router";
import {SearchComponent} from "../shared/search/search.component";
import { TxComponent } from './tx/tx.component';

const routes = RouterModule.forChild([
   {path: 'knowledgebase/recipes', redirectTo: 'search', pathMatch: 'full'},
    {path: 'search', component: SearchComponent},
    // {path: 'test1', component: RecipesComponent},
    // {path: 'test2', component: RecipesComponent}
  ])



@NgModule({
  imports: [
    CommonModule,
    routes],
    declarations: [RecipesComponent, TxComponent],
 exports: []
})
export class RecipesModule {
}
