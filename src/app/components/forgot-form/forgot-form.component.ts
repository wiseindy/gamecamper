import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { AuthenticationService } from '@gamecamper/_services';
import { NotEmpty } from '@gamecamper/_helpers';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-form',
  templateUrl: './forgot-form.component.html',
  styleUrls: ['./forgot-form.component.css']
})
export class ForgotFormComponent implements OnInit {

  forgotForm: FormGroup;
  success = false;
  forgotBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(
    protected readonly formBuilder: FormBuilder,
    protected readonly authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    }, {
      validator: [
        NotEmpty('email'),
      ],
    });
  }

  reset() {
    this.success = false;
    if (this.forgotForm.invalid) {
      return;
    }

    this.forgotBtnState = ClrLoadingState.LOADING;
    this.authenticationService.forgot(this.forgotForm.controls.email.value)
      .pipe(
        first()
      )
      .subscribe(
        data => {
          this.success = true;
          this.forgotBtnState = ClrLoadingState.SUCCESS;
        },
        error => {
          this.forgotBtnState = ClrLoadingState.ERROR;
        }
      );
  }

}
