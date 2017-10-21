import {Component, OnInit, Input, HostListener, ViewChild, ElementRef, forwardRef} from '@angular/core';
import {DefaultValueAccessor, ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {noop} from "@angular/core/src/linker/view_utils";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EditBoxComponent),
  multi: true
};


@Component({
  selector: 'edit-box',
  templateUrl: './edit-box.component.html',
  styleUrls: ['./edit-box.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class EditBoxComponent implements OnInit, ControlValueAccessor {


  @Input() placeholder = "Enter you buns here...";
  @ViewChild("inputbox") ele: ElementRef;
  private onchangeCallback: () => void = noop;
  items = ["Box"];

  constructor() { }


  ngOnInit() { }

  writeValue(obj: any): void {
    if (!obj) { return; }
    this.items = obj;
    // console.log('writeValue',obj);
  }


  registerOnChange(fn: any): void {
    this.onchangeCallback = fn;
  }


  registerOnTouched(fn: any): void { }


  onDelete(event, idx) {
    console.log(" event instanceof  KeyboardEvent", event.target);
    if (event instanceof KeyboardEvent) { return; }
    this.items.splice(idx, 1);
  }

  on_keyup(event: KeyboardEvent) {

    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();

    if (event.key === 'Enter')
    {
      const value = (event.target as HTMLInputElement).value.trim();

      if ( (value == null) || value === "")  {return false; }

      if (!this.items.includes(value)) {
        this.items.push(value);
      }

      this.ele.nativeElement.value = '';
    }

    return false;
  }

}
