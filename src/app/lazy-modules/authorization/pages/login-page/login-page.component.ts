import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { RoutingConstants } from 'src/app/shared/constants/routing.constants';
import { AppState } from 'src/app/store/app.reducers';
import { loginUserAction } from 'src/app/store/auth/auth.actions';
import { formBlockSelector } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public form!: FormGroup;
  public formEnable: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: Router
  ) {
    this.store
      .pipe(select(formBlockSelector))
      .subscribe((value) => (this.formEnable = value));
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(loginUserAction(this.form.getRawValue()));
  }

  public goToRegistration(): void {
    this.form.reset();
    this.route.navigate([RoutingConstants.AUTH, RoutingConstants.REGISTRATION]);
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
}
