import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountBoxComponent } from './discount-box.component';

describe('DiscountBoxComponent', () => {
  let component: DiscountBoxComponent;
  let fixture: ComponentFixture<DiscountBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
