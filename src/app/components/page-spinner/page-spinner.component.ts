import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-spinner',
  templateUrl: './page-spinner.component.html',
  styleUrls: ['./page-spinner.component.css']
})
export class PageSpinnerComponent implements OnInit {

  @Input() text = 'Loading...';

  constructor() { }

  ngOnInit(): void {
  }

}
