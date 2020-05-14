import { Component, OnInit } from '@angular/core';
import { GameService } from '../../_services/game.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  providers: [GameService],
})
export class SearchBarComponent implements OnInit {

  searchText$ = new Subject<string>();
  searchGames: string[];
  arrowkeyLocation = 0;
  loading = false;
  error = false;

  constructor(
    protected readonly gameService: GameService,
  ) { }

  ngOnInit() {
    this.gameService.find('ca', this.searchText$)
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

  search(query: string) {
    this.error = false;
    if (query) {
      this.loading = true;
      this.searchText$.next(query);
    }
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
