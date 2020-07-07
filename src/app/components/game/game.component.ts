import { Component, OnInit, Input } from '@angular/core';
import { WatchlistService, AuthenticationService } from '@gamecamper/_services';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { first } from 'rxjs/operators';
import { ClrLoadingState } from '@clr/angular';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Input() game;
  apiEndpoint: string;
  hasWatchlist = false;
  imgUrl;
  user;
  faExternalLinkAlt = faExternalLinkAlt;
  watchlistModal = false;
  watchlistBtnState: ClrLoadingState = ClrLoadingState.LOADING;

  constructor(
    protected readonly watchlistService: WatchlistService,
    protected readonly authenticationService: AuthenticationService,
  ) {
    this.apiEndpoint = environment.apiUrl;
  }

  ngOnInit() {

    this.authenticationService.theUser.subscribe(user => {
      this.user = user;
    });

    if (this.game.steamId) {
      if (!this.game.bundle && !this.game.package) {
        // this.imgUrl = 'https://steamcdn-a.akamaihd.net/steam/apps/' + this.game.steamId + '/capsule_616x353.jpg';
        this.imgUrl = 'https://steamcdn-a.akamaihd.net/steam/apps/' + this.game.steamId + '/header.jpg';
      }
    }

    if (this.user) {
      this.watchlistService.get()
        .pipe(
          first()
        )
        .subscribe(
          watchlist => {
            this._checkWatchlistStatus(watchlist);
            this.watchlistBtnState = ClrLoadingState.DEFAULT;
          },
          error => {
            this.watchlistBtnState = ClrLoadingState.DEFAULT;
          }
        );

      this.watchlistService.theWatchlist.subscribe(watchlist => {
        this._checkWatchlistStatus(watchlist);
      });
    }
  }

  private _checkWatchlistStatus(watchlist) {
    for (const game of watchlist) {
      if (game.gameId === this.game.id) {
        this.hasWatchlist = true;
        break;
      }
    }
  }

}
