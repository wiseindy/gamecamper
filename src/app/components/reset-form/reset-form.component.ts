import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { AuthenticationService } from '@gamecamper/_services';
import { MustMatch } from '@gamecamper/_helpers/must-match.validator';
import { Router, ActivatedRoute } from '@angular/router';
import { NotEmpty } from '@gamecamper/_helpers';

@Component({
  selector: 'app-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.css']
})
export class ResetFormComponent implements OnInit {

  success = false;
  resetForm: FormGroup;
  resetBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(
    protected readonly formBuilder: FormBuilder,
    protected readonly authenticationService: AuthenticationService,
    protected readonly route: ActivatedRoute,
    protected readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      password: ['', Validators.minLength(6)],
      confirm: ['', Validators.minLength(6)],
    }, {
      validator: [
        MustMatch('password', 'confirm'),
        NotEmpty('password'),
        NotEmpty('confirm'),
      ],
    });
  }

  reset() {
    if (this.resetForm.invalid) {
      return;
    }

    const password = this.resetForm.controls.password.value;
    const token = this.route.snapshot.paramMap.get('token');

    this.success = false;

    this.resetBtnState = ClrLoadingState.LOADING;

    this.authenticationService.reset(token, password).subscribe(
      data => {
        this.success = true;
        this.resetBtnState = ClrLoadingState.SUCCESS;
        this.router.navigate(['/']);
      },
      error => {
        this.resetBtnState = ClrLoadingState.ERROR;
      }
    );
  }

}
