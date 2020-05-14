import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-img-box',
  templateUrl: './img-box.component.html',
  styleUrls: ['./img-box.component.css']
})
export class ImgBoxComponent implements OnInit {

  @Input() url;
  loadedUrl;
  placeholder = '/assets/img/gc-placeholder.jpg';

  ngOnInit(): void {
    if (!this.url) {
      this.url = this.placeholder;
    }
  }

  loadError() {
    this.url = this.placeholder;
  }

}
