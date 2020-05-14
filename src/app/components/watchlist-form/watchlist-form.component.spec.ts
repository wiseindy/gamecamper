import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistFormComponent } from './watchlist-form.component';

describe('WatchlistFormComponent', () => {
  let component: WatchlistFormComponent;
  let fixture: ComponentFixture<WatchlistFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchlistFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
