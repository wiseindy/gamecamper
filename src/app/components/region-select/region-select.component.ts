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

  changeRegion(region) {
    this.geoService.switchRegion({
      region
    });
    this.selected = region;
    this.regions = this.filter(this.allRegions, this.selected);
  }

  private getRegion() {
    this.geoService.theGeo.subscribe(geo => {
      if (geo) {
        if (geo.region) {
          this.selected = geo.region;
          this.regions = this.filter(this.allRegions, this.selected);
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
          this.regions = this.filter(this.allRegions, this.selected);
          this.loading = false;
        }
      },
      error => {
        this.loading = false;
      }
    );
  }

  private filter(filterList, element) {
    if (filterList.length > 0) {
      const list = filterList.filter(x => {
        if (x.id === element.id) {
          return false;
        }
        return true;
      });
      return list;
    } else {
      return filterList;
    }
  }

}
