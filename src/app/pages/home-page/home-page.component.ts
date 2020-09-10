import { Component, OnInit } from '@angular/core';
import { GeoService } from '@gamecamper/_services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public buckets = {
    1: 1,
    5: 5,
    10: 10,
  };
  public currencyLeft = '$';
  public currencyRight = '';
  public separator = '.';

  constructor(
    protected readonly geoService: GeoService
  ) { }

  ngOnInit(): void {
    this.geoService.theGeo.subscribe(geo => {
      if (geo) {
        try {
          this.buckets = geo.region.buckets;
          this.separator = geo.region.currency_separator;
          if (geo.region.currency_symbol_position === 'right') {
            this.currencyLeft = '';
            this.currencyRight = geo.region.currency_symbol;
          } else {
            this.currencyLeft = geo.region.currency_symbol;
            this.currencyRight = '';
          }
        } catch (error) { }
      }
    });
  }

}
