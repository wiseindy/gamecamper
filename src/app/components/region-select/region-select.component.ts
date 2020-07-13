import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { GeoService } from '@gamecamper/_services';

@Component({
  selector: 'app-region-select',
  templateUrl: './region-select.component.html',
  styleUrls: ['./region-select.component.css']
})
export class RegionSelectComponent implements OnInit {

  @ViewChild('dropdownTemplate') dropdownTemplate: TemplateRef<any>;

  allRegions = [];
  regions;
  selected;
  loading = false;

  constructor(
    protected readonly geoService: GeoService
  ) { }

  ngOnInit(): void {
    this.getRegion();
  }

  switchRegion(region) {
    this.selected = region;
    this.regions = this._filter(this.allRegions, this.selected);
  }

  private getRegion() {
    this.geoService.theGeo.subscribe(geo => {
      if (geo) {
        if (geo.region) {
          this.switchRegion(geo.region.toUpperCase());
          this.getAllRegions();
        }
      }
    });
  }

  private getAllRegions() {
    this.loading = true;
    this.geoService.get().subscribe(
      data => {
        if (data) {
          this.allRegions = data;
          this.regions = this._filter(this.allRegions, this.selected);
          this.loading = false;
        }
      },
      error => {
        this.loading = false;
      }
    );
  }

  private _filter(filterList, element) {
    if (filterList.length > 0) {
      const list = [...filterList];
      const match = list.indexOf(element);
      list.splice(match, 1);
      return list;
    } else {
      return filterList;
    }
  }

}
