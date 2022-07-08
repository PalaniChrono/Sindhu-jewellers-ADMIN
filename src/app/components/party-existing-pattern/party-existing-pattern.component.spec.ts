import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyExistingPatternComponent } from './party-existing-pattern.component';

describe('PartyExistingPatternComponent', () => {
  let component: PartyExistingPatternComponent;
  let fixture: ComponentFixture<PartyExistingPatternComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyExistingPatternComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyExistingPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
