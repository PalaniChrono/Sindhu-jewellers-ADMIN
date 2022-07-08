import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingExistingPatternComponent } from './listing-existing-pattern.component';

describe('ListingExistingPatternComponent', () => {
  let component: ListingExistingPatternComponent;
  let fixture: ComponentFixture<ListingExistingPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingExistingPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingExistingPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
