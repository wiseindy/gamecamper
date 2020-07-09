import { Component, OnInit, Input } from '@angular/core';
import { faGamepad, faCoins, faMoneyBillAlt, faTags } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-featured-category',
  templateUrl: './featured-category.component.html',
  styleUrls: ['./featured-category.component.css']
})
export class FeaturedCategoryComponent implements OnInit {

  @Input() titleText;
  @Input() category;
  faIcon = faGamepad;

  constructor() { }

  ngOnInit(): void {
    switch (this.category) {
      case '1':
        this.faIcon = faGamepad;
        break;
      case '2':
        this.faIcon = faMoneyBillAlt;
        break;
      case '3':
        this.faIcon = faTags;
        break;
      case '4':
        this.faIcon = faCoins;
        break;
      default:
        break;
    }
  }

}
