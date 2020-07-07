import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedditWidgetComponent } from './reddit-widget.component';

describe('RedditWidgetComponent', () => {
  let component: RedditWidgetComponent;
  let fixture: ComponentFixture<RedditWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedditWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedditWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
