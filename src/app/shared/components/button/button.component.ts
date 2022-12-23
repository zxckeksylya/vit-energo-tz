import { Component, EventEmitter, Input, Output } from '@angular/core';

export type BehaviorType = 'button' | 'submit';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() public disabled = false;
  @Input() public type: BehaviorType = 'button';

  @Output() public buttonClick = new EventEmitter<Event>();

  public onButtonClick(event: Event): void {
    this.buttonClick.emit(event);
  }
}
