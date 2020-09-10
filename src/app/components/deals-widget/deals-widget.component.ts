import { Component, OnInit, Input } from '@angular/core';
import { DealsService, FreeGamesService, GeoService } from '@gamecamper/_services';
import { shareReplay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-deals-widget',
  templateUrl: './deals-widget.component.html',
  styleUrls: ['./deals-widget.component.css']
})
export class DealsWidgetComponent implements OnInit {

  @Input() header;
  @Input() headerText;
  @Input() type;
  @Input() rangeValue = '0';
  @Input() showLoadMore = false;

  games: string[];
  loading = false;
  error = false;
  page = 1;

  deal0Subscription: Subscription;
  deal1Subscription: Subscription;
  deal5Subscription: Subscription;
  deal10Subscription: Subscription;
  dealSubscription: Subscription;

  regionId;
  deal0$;
  deal1$;
  deal5$;
  deal10$;
  deal$;

  constructor(
    protected dealsService: DealsService,
    protected freeGamesService: FreeGamesService,
    protected geoService: GeoService,
  ) { }

  ngOnInit(): void {
    this.geoService.theGeo.subscribe(geo => {
      if (geo) {
        if (geo.region) {
          this.regionId = geo.region.id;
          this.getData();
        }
      }
    });
  }

  private getData() {
    this.deal0$ = this.dealsService.find(this.regionId, this.type).pipe(shareReplay(1));
    this.deal1$ = this.dealsService.find1(this.regionId, this.page).pipe(shareReplay(1));
    this.deal5$ = this.dealsService.find5(this.regionId, this.page).pipe(shareReplay(1));
    this.deal10$ = this.dealsService.find10(this.regionId, this.page).pipe(shareReplay(1));

    this.deal$ = this.freeGamesService.find0(this.regionId, this.page).pipe(shareReplay(1));

    this.loading = true;
    this.error = false;

    if (this.type === 'range') {
      let obs;
      let sub;
      switch (this.rangeValue) {
        case '0':
          obs = this.deal$;
          sub = this.dealSubscription;
          break;
        case '1':
          obs = this.deal1$;
          sub = this.deal1Subscription;
          break;
        case '5':
          obs = this.deal5$;
          sub = this.deal5Subscription;
          break;
        case '10':
          obs = this.deal10$;
          sub = this.deal10Subscription;
          break;
        default:
          obs = this.deal$;
          sub = this.dealSubscription;
          break;
      }
      if (sub) {
        sub.unsubscribe();
        this.games = null;
      }
      sub = obs.subscribe(
        data => {
          this.error = false;
          this.loading = false;
          if (this.page > 1) {
            this.games.push(...data);
          } else {
            this.games = data;
          }
        },
        error => {
          this.error = true;
          this.loading = false;
        });
    } else {
      if (this.deal0Subscription) {
        this.deal0Subscription.unsubscribe();
        this.games = null;
      }
      this.deal0Subscription = this.deal0$.subscribe(
        data => {
          this.error = false;
          this.loading = false;
          this.games = data;
        },
        error => {
          this.error = true;
          this.loading = false;
        });
    }
  }

  loadMore() {
    this.page++;
    this.getData();
  }

}
