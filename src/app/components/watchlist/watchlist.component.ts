import { Component, OnChanges, Input, OnInit, AfterViewInit } from '@angular/core';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { WatchlistService } from '@gamecamper/_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() watchlistItem;
  watchlistForm: FormGroup;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  isHighlighted = false;

  constructor(
    protected readonly formBuilder: FormBuilder,
    protected readonly watchlistService: WatchlistService,
    protected readonly route: ActivatedRoute,
    protected readonly router: Router,
  ) { }

  ngOnInit(): void {

    if (this.watchlistItem.steamId) {
      if (!this.watchlistItem.bundle && !this.watchlistItem.package) {
        this.watchlistItem.imgUrl = 'https://steamcdn-a.akamaihd.net/steam/apps/' + this.watchlistItem.steamId + '/capsule_616x353.jpg';
      }
    }
  }

  ngOnChanges(): void {

    this.watchlistForm = this.formBuilder.group({
      watchPrice: ['', [Validators.required, Validators.pattern('^[0-9]+([,.][0-9]+)?$')]]
    });

    this.watchlistItem.difference = this.watchlistItem.stores[0].price.simple - this.watchlistItem.watchPrice;
    this.watchlistItem.difference = Math.abs(this.watchlistItem.difference).toFixed(2);
  }

  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment === this.watchlistItem.gameId) {
        const element = document.getElementById(fragment);
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        // element.scrollIntoView();
        element.classList.add('gc-flash');
        this.router.navigate(['/watchlist']);
      }
    });
  }

}
