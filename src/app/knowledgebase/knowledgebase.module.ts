import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KnowledgebaseComponent} from './knowledgebase.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [{path: 'knowledgeBase', component: KnowledgebaseComponent}]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [KnowledgebaseComponent]
})
export class KnowledgebaseModule {
}
