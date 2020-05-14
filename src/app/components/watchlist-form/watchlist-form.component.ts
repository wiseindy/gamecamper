import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faSyncAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ClrLoadingState } from '@clr/angular';
import { UpdateWatchlist } from '@gamecamper/_models';
import { WatchlistService } from '@gamecamper/_services';

@Component({
  selector: 'app-watchlist-form',
  templateUrl: './watchlist-form.component.html',
  styleUrls: ['./watchlist-form.component.css']
})
export class WatchlistFormComponent implements OnInit {

  @Input() watchlistItem;
  faSyncAlt = faSyncAlt;
  faTimes = faTimes;
  watchlistForm: FormGroup;
  error = false;
  selectedItem;
  confirmationModal = false;
  deleteBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  updateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(
    protected readonly formBuilder: FormBuilder,
    protected readonly watchlistService: WatchlistService
  ) { }

  ngOnInit(): void {
    this.watchlistForm = this.formBuilder.group({
      watchPrice: [
        this.watchlistItem.watchPrice.toFixed(2),
        [
          Validators.required,
          Validators.pattern('^[0-9]+([,.][0-9]{0,4})?$'),
          Validators.min(0),
          Validators.max(9999),
        ]
      ]
    });
  }

  confirmDelete() {
    this.confirmationModal = true;
  }

  deleteItem() {
    this.error = false;
    this.deleteBtnState = ClrLoadingState.LOADING;
    this.watchlistService.delete(this.watchlistItem._id).subscribe(
      data => {
        this.confirmationModal = false;
        this.watchlistItem = null;
        this.deleteBtnState = ClrLoadingState.SUCCESS;
      },
      error => {
        this.error = true;
        this.deleteBtnState = ClrLoadingState.ERROR;
      }
    );
  }

  updateWatchlist() {
    if (this.watchlistForm.invalid) {
      return;
    }
    this.updateBtnState = ClrLoadingState.LOADING;

    const watchlist: UpdateWatchlist = {
      watchPrice: this.watchlistForm.controls.watchPrice.value
    };

    this.watchlistService.update(this.watchlistItem._id, watchlist).subscribe(
      data => {
        this.updateBtnState = ClrLoadingState.SUCCESS;
      },
      error => {
        this.error = true;
        this.updateBtnState = ClrLoadingState.ERROR;
      }
    );
  }

}
