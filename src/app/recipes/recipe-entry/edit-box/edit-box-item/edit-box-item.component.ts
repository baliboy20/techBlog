import {Component, OnInit, Input, EventEmitter, Output, HostListener} from '@angular/core';

@Component({
  selector: 'edit-box-item',
  templateUrl: './edit-box-item.component.html',
  styleUrls: ['./edit-box-item.component.scss']
})
export class EditBoxItemComponent implements OnInit {

  @Input('item') item:string;
  @Output('doDelete') doDelete: EventEmitter<any>= new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  on_delete(event:MouseEvent){
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    console.log('xbutt clicked..',event.target);
    this.doDelete.emit(this.item);
    return false;

  }


}
