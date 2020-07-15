import { Component, OnInit, Input } from '@angular/core';
import { WatchlistService, AuthenticationService } from '@gamecamper/_services';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { first } from 'rxjs/operators';
import { ClrLoadingState } from '@clr/angular';
import { environment } from '@environments/environment';
import { Subscription } from 'rxjs';

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
  watchlistBtnState: ClrLoadingState;
  watchlistBtnDisabled: boolean;
  watchlistSubscription: Subscription;

  constructor(
    protected readonly watchlistService: WatchlistService,
    protected readonly authenticationService: AuthenticationService,
  ) {
    this.apiEndpoint = environment.apiUrl;
  }

  ngOnInit() {

    this.watchlistBtnState = ClrLoadingState.LOADING;
    this.watchlistBtnDisabled = true;

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
      this.subscribeToWatchlist();
    }
  }

  reload() {
    this.watchlistModal = false;
    if (this.watchlistSubscription) {
      this.watchlistSubscription.unsubscribe();
    }
    this.subscribeToWatchlist();
  }

  private subscribeToWatchlist() {
    this.watchlistBtnState = ClrLoadingState.LOADING;
    this.watchlistBtnDisabled = true;
    this.watchlistService.get()
      .pipe(
        first()
      )
      .subscribe(
        watchlist => {
          this.checkWatchlistStatus(watchlist);
          this.watchlistBtnState = ClrLoadingState.DEFAULT;
          this.watchlistBtnDisabled = false;
        },
        error => {
          this.watchlistBtnState = ClrLoadingState.DEFAULT;
          this.watchlistBtnDisabled = false;
        }
      );
  }

  private checkWatchlistStatus(watchlist) {
    for (const game of watchlist) {
      if (game.gameId === this.game.id) {
        this.hasWatchlist = true;
        break;
      }
    }
  }

}
