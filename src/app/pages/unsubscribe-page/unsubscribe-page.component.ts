import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnsubscribeService } from '@gamecamper/_services';

@Component({
  selector: 'app-unsubscribe-page',
  templateUrl: './unsubscribe-page.component.html',
  styleUrls: ['./unsubscribe-page.component.css']
})
export class UnsubscribePageComponent implements OnInit {

  loading = false;
  success = false;

  constructor(
    protected readonly route: ActivatedRoute,
    protected readonly unsubscribeService: UnsubscribeService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    const token = this.route.snapshot.paramMap.get('token');
    this.unsubscribeService.unsubscribe(token)
      .subscribe(
        data => {
          this.loading = false;
          this.success = true;
        },
        error => {
          this.loading = false;
        }
      );
  }

}
