import { Component, OnInit, Input } from '@angular/core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-widget-row',
  templateUrl: './widget-row.component.html',
  styleUrls: ['./widget-row.component.css']
})
export class WidgetRowComponent implements OnInit {

  @Input() game;
  imgUrl;
  faExternalLinkAlt = faExternalLinkAlt;

  constructor() { }

  ngOnInit(): void {
    if (this.game.steamId) {
      if (!this.game.bundle && !this.game.package) {
        // this.imgUrl = 'https://steamcdn-a.akamaihd.net/steam/apps/' + this.game.steamId + '/capsule_616x353.jpg';
        this.imgUrl = 'https://steamcdn-a.akamaihd.net/steam/apps/' + this.game.steamId + '/header.jpg';
      }
    }
  }

}
