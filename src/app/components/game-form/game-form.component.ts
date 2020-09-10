import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewWatchlist } from '@gamecamper/_models';
import { WatchlistService, GeoService } from '@gamecamper/_services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @Input() game;
  @Output() done: EventEmitter<any> = new EventEmitter<any>();
  watchlistForm: FormGroup;
  addBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  error = false;

  constructor(
    protected readonly watchlistService: WatchlistService,
    protected readonly formBuilder: FormBuilder,
    protected readonly geoService: GeoService,
  ) { }

  ngOnInit(): void {

    this.watchlistForm = this.formBuilder.group({
      watchPrice: ['', [
        Validators.required,
        Validators.pattern('^[0-9]+([,.][0-9]{0,4})?$'),
        Validators.min(0),
        Validators.max(9999),
      ]]
    });
  }

  addToWatchlist() {
    if (this.watchlistForm.invalid) {
      return;
    }
    this.addBtnState = ClrLoadingState.LOADING;

    const watchlist: NewWatchlist = {
      gameId: this.game.id,
      regionId: this.geoService.theGeoValue.region.id,
      watchPrice: parseFloat(this.watchlistForm.controls.watchPrice.value)
    };

    this.watchlistService.add(watchlist).subscribe(
      data => {
        this.addBtnState = ClrLoadingState.SUCCESS;
        this.done.emit();
      },
      error => {
        this.error = true;
        this.addBtnState = ClrLoadingState.ERROR;
      }
    );
  }

}
