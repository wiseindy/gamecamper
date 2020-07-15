import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { AuthenticationService } from '@gamecamper/_services';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NewUser } from '@gamecamper/_models';
import { MustMatch, NotEmpty } from '@gamecamper/_helpers';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  registerForm: FormGroup;
  returnUrl: string;
  warning = false;
  registerBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  a: number;
  b: number;

  constructor(
    protected readonly formBuilder: FormBuilder,
    protected readonly authenticationService: AuthenticationService,
    protected readonly route: ActivatedRoute,
    protected readonly router: Router,
  ) {
    this.a = this.gen();
    this.b = this.gen();
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)],
      confirm: ['', Validators.minLength(6)],
      c: ['', [Validators.required, Validators.pattern('^' + (this.a + this.b).toString() + '$')]]
    }, {
      validator: [
        MustMatch('password', 'confirm'),
        NotEmpty('name'),
        NotEmpty('email'),
        NotEmpty('password'),
        NotEmpty('confirm'),
        NotEmpty('c'),
      ],
    });

    if (this.route.snapshot.queryParams.returnUrl) {
      this.warning = true;
    }

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    const user: NewUser = {
      name: this.registerForm.controls.name.value,
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value,
      a: this.a,
      b: this.b,
      c: parseInt(this.registerForm.controls.c.value, 10),
    };

    this.registerBtnState = ClrLoadingState.LOADING;
    this.authenticationService.register(user)
      .pipe(
        first()
      )
      .subscribe(
        data => {
          this.registerBtnState = ClrLoadingState.SUCCESS;
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.registerBtnState = ClrLoadingState.ERROR;
          this.a = this.gen();
          this.b = this.gen();
        }
      );
  }

  private gen() {
    return Math.floor(Math.random() * 10);
  }

}
