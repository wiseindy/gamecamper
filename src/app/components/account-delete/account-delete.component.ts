import { Component, OnInit } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@gamecamper/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.css']
})
export class AccountDeleteComponent implements OnInit {

  deleteForm: FormGroup;
  deleteConfirmationModal = false;
  deleteBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(
    protected readonly formBuilder: FormBuilder,
    protected readonly authenticationService: AuthenticationService,
    protected readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.deleteForm = this.formBuilder.group({
      deleteText: ['', [Validators.required, Validators.pattern('^DELETE$')]]
    });
  }

  deleteAccount() {
    if (this.deleteForm.invalid) {
      return;
    }
    this.deleteBtnState = ClrLoadingState.LOADING;
    this.authenticationService.delete().subscribe(
      data => {
        this.deleteBtnState = ClrLoadingState.SUCCESS;
        this.router.navigate(['/']);
      },
      error => {
        this.deleteBtnState = ClrLoadingState.ERROR;
      }
    );
  }

}
