import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../store/app.reducers';
import { registerUserAction } from '../../../../store/auth/auth.actions';
import { formBlockSelector } from '../../../../store/auth/auth.selectors';
import { Router } from '@angular/router';
import { RoutingConstants } from 'src/app/shared/constants/routing.constants';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent implements OnInit {
  public form!: FormGroup;
  public formEnable: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: Router
  ) {}

  public ngOnInit(): void {
    this.initForm();
    this.store
      .pipe(select(formBlockSelector))
      .subscribe((value) => (this.formEnable = value));
  }

  public onSubmit(): void {
    console.log(this.form.value.password);
    console.log(this.form.value.repeatPassword);
    if (
      this.form.invalid ||
      this.form.value.password !== this.form.value.repeatPassword
    ) {
      return;
    }
    this.form.markAllAsTouched();
    const user = { ...this.form.getRawValue() };
    this.store.dispatch(
      registerUserAction({ email: user.email, password: user.password })
    );
  }

  public goToLogin(): void {
    this.route.navigate([RoutingConstants.AUTH, RoutingConstants.LOGIN]);
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
}
