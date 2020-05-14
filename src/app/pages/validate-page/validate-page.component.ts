import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidateService, AuthenticationService } from '@gamecamper/_services';

@Component({
  selector: 'app-validate-page',
  templateUrl: './validate-page.component.html',
  styleUrls: ['./validate-page.component.css']
})
export class ValidatePageComponent implements OnInit {

  loading = false;
  success = false;

  constructor(
    protected readonly route: ActivatedRoute,
    protected readonly router: Router,
    protected readonly validateService: ValidateService,
    protected readonly authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    const token = this.route.snapshot.paramMap.get('token');
    this.validateService.validate(token)
      .subscribe(
        data => {
          this.loading = false;
          this.success = true;
          this.authenticationService.logout();
        },
        error => {
          this.loading = false;
        }
      );
  }

}
