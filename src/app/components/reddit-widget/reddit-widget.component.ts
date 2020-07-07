import { Component, OnInit, Input } from '@angular/core';
import { FreeGamesService } from '@gamecamper/_services';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reddit-widget',
  templateUrl: './reddit-widget.component.html',
  styleUrls: ['./reddit-widget.component.css']
})
export class RedditWidgetComponent implements OnInit {

  @Input() header;
  @Input() headerUrl;
  @Input() headerText;
  @Input() more = false;
  faExternalLinkAlt = faExternalLinkAlt;
  games: string[];
  loading = false;
  error = false;

  constructor(
    protected freeGamesService: FreeGamesService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.error = false;
    this.freeGamesService.find(this.more).subscribe(
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
