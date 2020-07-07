import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsWidgetComponent } from './deals-widget.component';

describe('DealsWidgetComponent', () => {
  let component: DealsWidgetComponent;
  let fixture: ComponentFixture<DealsWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
