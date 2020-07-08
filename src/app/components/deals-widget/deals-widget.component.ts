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
  games: string[];
  loading = false;
  error = false;

  free$;
  free0$;

  constructor(
    protected dealsService: DealsService,
    protected freeGamesService: FreeGamesService,
  ) { }

  ngOnInit(): void {
    this.free$ = this.dealsService.find('ca', this.type).pipe(shareReplay(1));
    this.free0$ = this.freeGamesService.find0('ca').pipe(shareReplay(1));

    this._getData();
  }

  private _getData() {
    this.loading = true;
    this.error = false;

    if (this.type === 'exclusive') {
      this.free0$.subscribe(
        data => {
          this.error = false;
          this.loading = false;
          this.games = data;
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

}
