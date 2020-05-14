import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  @Input() text;
  @Input() type = 'danger';
  @Input() canClose = false;

  constructor() { }

  ngOnInit(): void {
  }

}
