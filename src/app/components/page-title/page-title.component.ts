import { Component, OnInit, Input } from '@angular/core';
import { ErrorService } from '@gamecamper/_services';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.css']
})
export class PageTitleComponent implements OnInit {

  @Input() titleText;
  error;

  constructor(
    protected readonly errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    this.errorService.error.subscribe(error => {
      this.error = error;
    });
  }

}
