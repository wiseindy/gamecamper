import { Component, OnInit, Input } from '@angular/core';
import { DealsService } from '@gamecamper/_services';

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
    protected dealsService: DealsService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.error = false;
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
