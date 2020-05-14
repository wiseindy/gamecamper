import { Component, OnInit, Input } from '@angular/core';
import { ValidateService } from '@gamecamper/_services';
import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'app-email-alert',
  templateUrl: './email-alert.component.html',
  styleUrls: ['./email-alert.component.css']
})
export class EmailAlertComponent implements OnInit {

  loading = false;
  success = false;
  resendBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(
    protected readonly validateService: ValidateService,
  ) { }

  ngOnInit(): void {
  }

  resend() {
    this.success = false;
    this.loading = false;
    this.resendBtnState = ClrLoadingState.LOADING;
    this.validateService.resend().subscribe(
      data => {
        this.success = true;
        this.loading = false;
        this.resendBtnState = ClrLoadingState.SUCCESS;
      },
      error => {
        this.loading = false;
        this.resendBtnState = ClrLoadingState.ERROR;
      }
    );
  }

}
