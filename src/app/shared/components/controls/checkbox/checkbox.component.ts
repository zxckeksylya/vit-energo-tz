import { Component, Input } from '@angular/core';
import { BaseControl } from '../../../classes/base-control.class';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends BaseControl {
  @Input() public label = '';
}
