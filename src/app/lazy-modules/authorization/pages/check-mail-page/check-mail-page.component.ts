import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingConstants } from '../../../../shared/constants/routing.constants';

@Component({
  selector: 'app-check-mail-page',
  templateUrl: './check-mail-page.component.html',
  styleUrls: ['./check-mail-page.component.scss'],
})
export class CheckMailPageComponent {
  constructor(private route: Router) {}

  public goToLogin(): void {
    this.route.navigate([RoutingConstants.AUTH, RoutingConstants.LOGIN]);
  }
}
