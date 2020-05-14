import { Component, OnInit } from '@angular/core';
import { WatchlistService, AuthenticationService } from '@gamecamper/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-watchlist-page',
  templateUrl: './watchlist-page.component.html',
  styleUrls: ['./watchlist-page.component.css'],
  animations: [],
})
export class WatchlistPageComponent implements OnInit {

  loading = false;
  error = false;
  isHighlighted = true;
  isOpen = true;
  watchlist;
  user;

  constructor(
    protected readonly watchlistService: WatchlistService,
    protected readonly authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.watchlist = [];
    this.user = this.authenticationService.theUserValue;
    this.getData();
  }

  getData() {
    this.loading = true;
    this.watchlistService.get()
      .pipe(
        first()
      )
      .subscribe(
        watchlist => {
          this.watchlist = watchlist;
          this.error = false;
          this.loading = false;
        },
        error => {
          this.error = true;
          this.loading = false;
        }
      );

    this.watchlistService.theWatchlist.subscribe(watchlist => {
      this.watchlist = watchlist;
    });
  }

}
