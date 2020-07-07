import { Component, OnInit, Input } from '@angular/core';
import { DealsService, FreeGamesService } from '@gamecamper/_services';

@Component({
  selector: 'app-deals-widget',
  templateUrl: './deals-widget.component.html',
  styleUrls: ['./deals-widget.component.css']
})
export class DealsWidgetComponent implements OnInit {

  @Input() header;
  @Input() headerText;
  @Input() type;
  games: string[];
  loading = false;
  error = false;

  constructor(
    protected dealsService: DealsService,
    protected freeGamesService: FreeGamesService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.error = false;

    if (this.type === 'exclusive') {
      this.freeGamesService.find0('ca').subscribe(
        data => {
          this.error = false;
          this.loading = false;
          this.games = data;
        },
        error => {
          this.error = true;
          this.loading = false;
        });
    } else {
      this.dealsService.find('ca', this.type).subscribe(
        data => {
          this.error = false;
          this.loading = false;
          this.games = data;
        },
        error => {
          this.error = true;
          this.loading = false;
        });
    }
  }

}
