import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@gamecamper/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css']
})
export class AccountPageComponent implements OnInit {

  loading = false;
  error = false;
  user;

  constructor(
    protected readonly authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.authenticationService.refresh()
      .pipe(
        first()
      )
      .subscribe(
        user => {
          this.user = user;
          this.error = false;
          this.loading = false;
        },
        error => {
          this.error = true;
          this.loading = false;
        }
      );

    this.authenticationService.theUser.subscribe(user => {
      this.user = user;
    });
  }

}
