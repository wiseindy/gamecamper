import { Component, OnInit } from '@angular/core';
import { GameService } from '../../_services/game.service';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { GeoService } from '@gamecamper/_services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  providers: [GameService],
})
export class SearchBarComponent implements OnInit {

  searchText$ = new BehaviorSubject<string>('');
  searchGames: string[];
  searchSubscription: Subscription;
  regionId: string;
  arrowkeyLocation = 0;
  loading = false;
  error = false;

  constructor(
    protected readonly gameService: GameService,
    protected readonly geoService: GeoService,
  ) { }

  ngOnInit() {
    this.geoService.theGeo.subscribe(geo => {
      if (geo) {
        if (geo.region) {
          this.regionId = geo.region.id;
          this.findByText();
        }
      }
    });
  }

  search(query: string) {
    this.error = false;
    if (query && query !== this.searchText$.getValue()) {
      if (query.length > 2) {
        this.loading = true;
        this.searchGames = null;
        this.searchText$.next(query);
      }
    } else if (!query) {
      this.searchGames = null;
    }
  }

  private findByText() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
      this.loading = true;
      this.searchGames = null;
    }
    this.searchSubscription = this.gameService.find(this.regionId, this.searchText$)
      .subscribe(
        games => {
          if (games === -1) {
            this.error = true;
          } else {
            this.error = false;
            this.searchGames = games;
          }
          this.loading = false;
        },
        error => {
          this.error = true;
          this.loading = false;
        });
  }

  keyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        // console.log(this.arrowkeyLocation);
        if (this.arrowkeyLocation === 0) {
          this.arrowkeyLocation = this.searchGames.length;
        } else {
          this.arrowkeyLocation--;
        }
        break;
      case 'ArrowDown':
        // console.log(this.arrowkeyLocation);
        if (this.arrowkeyLocation > this.searchGames.length) {
          this.arrowkeyLocation = 0;
        } else {
          this.arrowkeyLocation++;
        }
        break;
    }
  }

}
