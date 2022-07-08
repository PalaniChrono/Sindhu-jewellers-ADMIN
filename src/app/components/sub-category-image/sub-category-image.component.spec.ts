import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryImageComponent } from './sub-category-image.component';

describe('SubCategoryImageComponent', () => {
  let component: SubCategoryImageComponent;
  let fixture: ComponentFixture<SubCategoryImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCategoryImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategoryImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
