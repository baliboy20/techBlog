import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditBoxComponent} from "./edit-box.component";
import { EditBoxItemComponent } from './edit-box-item/edit-box-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EditBoxComponent, EditBoxItemComponent],
  exports:[EditBoxComponent, EditBoxItemComponent]
})
export class EditBoxModule { }
