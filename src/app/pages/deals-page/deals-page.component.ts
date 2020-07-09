import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deals-page',
  templateUrl: './deals-page.component.html',
  styleUrls: ['./deals-page.component.css']
})
export class DealsPageComponent implements OnInit {

  dealValueRange = '0';

  constructor(
    protected readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.dealValueRange = this.route.snapshot.paramMap.get('value');
  }

}
