import { Component, Input } from '@angular/core';
import { BaseControl } from '../../../classes/base-control.class';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent extends BaseControl {
  @Input() public label = '';
  @Input() public readonly = false;
}
