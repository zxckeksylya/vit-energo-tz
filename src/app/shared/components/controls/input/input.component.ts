import { Component, Input } from '@angular/core';
import { BaseControl } from 'src/app/shared/classes/base-control.class';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent extends BaseControl {
  @Input() public label = '';
}
