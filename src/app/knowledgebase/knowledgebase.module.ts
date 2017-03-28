import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KnowledgebaseComponent} from './knowledgebase.component';
import {RouterModule, Routes} from "@angular/router";
import {recipeRoutes, RecipesModule} from "../recipes/recipes.module";
import {RecipesComponent} from "../recipes/recipes.component";

const routes: Routes = [
  { path: 'knowledgebase', component: KnowledgebaseComponent,
  children: [ ... recipeRoutes] }
  ]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RecipesModule,
  ],
  declarations: [KnowledgebaseComponent]
})
export class KnowledgebaseModule {
}
