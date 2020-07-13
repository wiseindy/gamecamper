import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { GeoService } from '@gamecamper/_services';

@Component({
  selector: 'app-region-select',
  templateUrl: './region-select.component.html',
  styleUrls: ['./region-select.component.css']
})
export class RegionSelectComponent implements OnInit {

  @ViewChild('dropdownTemplate') dropdownTemplate: TemplateRef<any>;

  allRegions;
  regions;
  selected;
  loading = false;

  constructor(
    protected readonly geoService: GeoService
  ) { }

  ngOnInit(): void {
    const defaultRegion = this.geoService.defaultRegion;
    this.regions = [defaultRegion];
    this.allRegions = [defaultRegion];
    this.selected = defaultRegion;
    this.geoService.theGeo.subscribe(geo => {
      if (!geo) {
        geo = {
          region: defaultRegion
        };
      } else if (!geo.region) {
        geo = {
          region: defaultRegion
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
