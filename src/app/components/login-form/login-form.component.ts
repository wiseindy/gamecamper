import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, ErrorService } from '@gamecamper/_services';
import { first } from 'rxjs/operators';
import { ClrLoadingState } from '@clr/angular';
import { NotEmpty } from '@gamecamper/_helpers';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;
  warning = false;
  loginBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(
    protected readonly formBuilder: FormBuilder,
    protected readonly authenticationService: AuthenticationService,
    protected readonly route: ActivatedRoute,
    protected readonly router: Router,
    protected readonly errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    }, {
      validator: [
        NotEmpty('email'),
        NotEmpty('password'),
      ],
    });

    if (this.route.snapshot.queryParams.returnUrl) {
      this.warning = true;
    }

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginBtnState = ClrLoadingState.LOADING;
    this.authenticationService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .pipe(
        first()
      )
      .subscribe(
        data => {
          this.loginBtnState = ClrLoadingState.SUCCESS;
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.loginBtnState = ClrLoadingState.ERROR;
        }
      );
  }

}
