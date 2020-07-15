import { Component, OnInit, Input } from '@angular/core';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-widget-reddit-row',
  templateUrl: './widget-reddit-row.component.html',
  styleUrls: ['./widget-reddit-row.component.css']
})
export class WidgetRedditRowComponent implements OnInit {

  @Input() game;
  faExternalLinkAlt = faExternalLinkAlt;

  constructor() { }

  ngOnInit(): void {
    this.game.title = this.decodeHTML(this.game.title);
  }

  decodeHTML(str: string) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(
      '<!doctype html><body>' + str,
      'text/html');
    return dom.body.textContent;
  }

}
