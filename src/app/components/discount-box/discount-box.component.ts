import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-discount-box',
  templateUrl: './discount-box.component.html',
  styleUrls: ['./discount-box.component.css']
})
export class DiscountBoxComponent implements OnInit {

  @Input() oldPrice;
  @Input() newPrice;
  @Input() priceSymbol;
  percentage;

  constructor() { }

  ngOnInit(): void {
    this.percentage = Math.round(((this.newPrice - this.oldPrice) / this.oldPrice) * 100) + '%';
  }

}
