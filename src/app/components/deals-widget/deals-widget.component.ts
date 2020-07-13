import { Component, OnInit, Input } from '@angular/core';
import { DealsService, FreeGamesService } from '@gamecamper/_services';
import { shareReplay } from 'rxjs/operators';

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

  free$;
  free1$;
  free5$;
  free10$;
  free0$;

  constructor(
    protected dealsService: DealsService,
    protected freeGamesService: FreeGamesService,
  ) { }

  ngOnInit(): void {
    this._getData();
  }

  private _getData() {
    this.free$ = this.dealsService.find('ca', this.type).pipe(shareReplay(1));
    this.free1$ = this.dealsService.find1('ca', this.page).pipe(shareReplay(1));
    this.free5$ = this.dealsService.find5('ca', this.page).pipe(shareReplay(1));
    this.free10$ = this.dealsService.find10('ca', this.page).pipe(shareReplay(1));

    this.free0$ = this.freeGamesService.find0('ca', this.page).pipe(shareReplay(1));

    this.loading = true;
    this.error = false;

    if (this.type === 'range') {
      let obs;
      switch (this.rangeValue) {
        case '0':
          obs = this.free0$;
          break;
        case '1':
          obs = this.free1$;
          break;
        case '5':
          obs = this.free5$;
          break;
        case '10':
          obs = this.free10$;
          break;
        default:
          obs = this.free0$;
          break;
      }
      obs.subscribe(
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
      this.free$.subscribe(
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
    this._getData();
  }

}
