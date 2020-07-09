import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedCategoryComponent } from './featured-category.component';

describe('FeaturedCategoryComponent', () => {
  let component: FeaturedCategoryComponent;
  let fixture: ComponentFixture<FeaturedCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
