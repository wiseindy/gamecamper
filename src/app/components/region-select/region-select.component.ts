import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { GeoService } from '@gamecamper/_services';

@Component({
  selector: 'app-region-select',
  templateUrl: './region-select.component.html',
  styleUrls: ['./region-select.component.css']
})
export class RegionSelectComponent implements OnInit {

  @ViewChild('dropdownTemplate') dropdownTemplate: TemplateRef<any>;

  allRegions = ['US'];
  regions = ['US'];
  selected = 'US';
  loading = false;

  constructor(
    protected readonly geoService: GeoService
  ) { }

  ngOnInit(): void {
    this.geoService.theGeo.subscribe(geo => {
      if (!geo) {
        geo = {
          region: this.geoService.defaultRegion
        };
      } else if (!geo.region) {
        geo = {
          region: this.geoService.defaultRegion
        };
      }
      this.switchRegion(geo.region.toUpperCase());
    });

    this.loading = true;
    this.geoService.get().subscribe(
      data => {
        this.allRegions = data;
        this.regions = this._filter(this.allRegions, this.selected);
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    );
  }

  switchRegion(region) {
    this.selected = region;
    this.regions = this._filter(this.allRegions, this.selected);
  }

  private _filter(filterList, element) {
    const list = [...filterList];
    const match = list.indexOf(element);
    list.splice(match, 1);
    return list;
  }

}
