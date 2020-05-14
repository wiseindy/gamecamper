import { Component, OnInit } from '@angular/core';
import { GameService } from '../../_services/game.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  loading = false;
  error = false;
  faChevronLeft = faChevronLeft;
  game;

  private gameId: string;

  constructor(
    protected gameService: GameService,
    protected route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get('game');
    this.getData();
  }

  getData() {
    this.loading = true;
    this.gameService.findOne('ca', this.gameId).subscribe(
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

  goBack() {
    this.location.back();
  }

}
