import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetRedditRowComponent } from './widget-reddit-row.component';

describe('WidgetRedditRowComponent', () => {
  let component: WidgetRedditRowComponent;
  let fixture: ComponentFixture<WidgetRedditRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetRedditRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetRedditRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
