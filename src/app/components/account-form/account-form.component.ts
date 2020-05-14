import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { AuthenticationService } from '@gamecamper/_services';
import { UpdateUser } from '@gamecamper/_models';
import { MustMatch } from '@gamecamper/_helpers/must-match.validator';
import { NotEmpty } from '@gamecamper/_helpers';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {

  @Input() user: UpdateUser;
  success = false;
  accountForm: FormGroup;
  updateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(
    protected readonly formBuilder: FormBuilder,
    protected readonly authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: ['', Validators.minLength(6)],
      confirm: ['', Validators.minLength(6)],
      allowEmails: [this.user.allowEmails]
    }, {
      validator: [
        MustMatch('password', 'confirm'),
        NotEmpty('name'),
        NotEmpty('email'),
      ],
    });
  }

  update() {
    if (this.accountForm.invalid) {
      return;
    }

    this.success = false;

    this.updateBtnState = ClrLoadingState.LOADING;
    const user: UpdateUser = {
      name: this.accountForm.controls.name.value,
      email: this.accountForm.controls.email.value,
      password: this.accountForm.controls.password.value,
      allowEmails: this.accountForm.controls.allowEmails.value,
    };

    this.authenticationService.update(user).subscribe(
      data => {
        this.success = true;
        this.updateBtnState = ClrLoadingState.SUCCESS;
      },
      error => {
        this.updateBtnState = ClrLoadingState.ERROR;
      }
    );
  }

}
