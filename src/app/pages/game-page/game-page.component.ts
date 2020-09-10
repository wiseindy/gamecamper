import { Component, OnInit } from '@angular/core';
import { GameService } from '../../_services/game.service';
import { ActivatedRoute } from '@angular/router';
import { GeoService } from '@gamecamper/_services';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  loading = false;
  error = false;
  game;
  regionId: string;
  gameSubscription: Subscription;

  private gameId: string;

  constructor(
    protected gameService: GameService,
    protected route: ActivatedRoute,
    protected geoService: GeoService,
  ) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('game');
    this.geoService.theGeo.subscribe(geo => {
      if (geo) {
        if (geo.region) {
          this.regionId = geo.region.id;
          this.getData();
        }
      }
    });
  }

  getData() {
    this.loading = true;
    if (this.gameSubscription) {
      this.gameSubscription.unsubscribe();
      this.game = null;
    }
    this.gameSubscription = this.gameService.findOne(this.regionId, this.gameId).subscribe(
      game => {
        this.error = false;
        this.loading = false;
        this.game = game[0];
      },
      error => {
        this.error = true;
        this.loading = false;
      });
  }

}
