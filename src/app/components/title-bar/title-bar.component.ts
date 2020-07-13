import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '@gamecamper/_services';
import { faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css']
})
export class TitleBarComponent implements OnInit {

  user;
  faSignOutAlt = faSignOutAlt;
  faUserCircle = faUserCircle;

  constructor(
    protected readonly authenticationService: AuthenticationService,
    private cdref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.authenticationService.theUser.subscribe(user => {
      this.user = user;
    });
    this.cdref.detectChanges();
  }

  public logout(): void {
    this.authenticationService.logout();
  }

}
