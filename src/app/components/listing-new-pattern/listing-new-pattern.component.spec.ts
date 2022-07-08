import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingNewPatternComponent } from './listing-new-pattern.component';

describe('ListingNewPatternComponent', () => {
  let component: ListingNewPatternComponent;
  let fixture: ComponentFixture<ListingNewPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingNewPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingNewPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
