import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeGamesPageComponent } from './free-games-page.component';

describe('FreeGamesPageComponent', () => {
  let component: FreeGamesPageComponent;
  let fixture: ComponentFixture<FreeGamesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeGamesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeGamesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
